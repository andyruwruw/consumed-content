// Local Imports
import {
  convertAndMergeMovies,
  convertAndMergeTvShows,
} from '../helpers/themoviedb-helpers';
import { Handler } from './handler';
import api from '../api';

// Types
import {
  Request,
  Response,
} from 'express';
import {
  IMovieDbMovieSimplified,
  IMovieDbPageObject,
  IMovieDbTvShowSimplified,
} from '../types';
import { IShow } from '../../../shared/types';

/**
 * Handler for getting a list of shows.
 */
export class GetShowListHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {VercelRequest} req Request for handler.
   * @param {VercelResponse} res Response to request.
   */
  async execute(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      await this._connectDatabase();

      const type = req.query.type || 'movie';
      const list = req.query.list || 'popular';

      let shows = [] as IShow[];
      let response: IMovieDbPageObject<IMovieDbMovieSimplified | IMovieDbTvShowSimplified>;

      if (type === 'tv-show') {
        if (list === 'top') {
          response = await api.themoviedb.tvShow.getTopRatedTvShows();
        } else {
          response = await api.themoviedb.tvShow.getPopularTvShows();
        }

        shows = await convertAndMergeTvShows(
          response.results as IMovieDbTvShowSimplified[],
          this._database,
        );
      } else {
        if (list === 'top') {
          response = await api.themoviedb.movie.getTopRatedMovies();
        } else {
          response = await api.themoviedb.movie.getPopularMovies();
        }
        shows = await convertAndMergeMovies(
          response.results as IMovieDbMovieSimplified[],
          this._database,
        );
      }

      res.status(200).send({
        shows,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
