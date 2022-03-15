// Local Imports
import { convertAndMergeTvShows, convertSimplifiedTvShows } from '../helpers/themoviedb-helpers';
import { Handler } from './handler';
import api from '../api';

// Types
import {
  Request,
  Response,
} from 'express';

/**
 * Handler for searching TV shows.
 */
export class SearchTvShowsHandler extends Handler {
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
      const query = req.query.query as string;
      const page = parseInt(req.query.page as string, 10) || 1;

      const response = await api.themoviedb.search.searchTvShows(
        query,
        page,
      );

      console.log(response.results);

      const shows = await convertAndMergeTvShows(response.results, this._database);

      console.log(shows);

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
