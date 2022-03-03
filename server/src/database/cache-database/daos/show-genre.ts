// Local Imports
import {
  Genre,
  Show,
} from './index';
import { DataAccessObject } from './dao';

// Types
import {
  IGenre,
  IGenreShowObject,
  IShow,
  IShowGenre,
  IShowGenreObject,
} from '../../../../../shared/types';
import { IShowGenreDAO } from '../../../types';

export class ShowGenre extends DataAccessObject<IShowGenre> implements IShowGenreDAO {
  /**
   * Adds a genre to a show.
   *
   * @param {number} showId Show's Id.
   * @param {number} genreId Genre's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async add(
    showId: number,
    genreId: number,
  ): Promise<number> {
    try {
      const response = await this._insert({
        showId,
        genreId,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Gets a show's genres.
   * 
   * @param {number} showId Show's Id.
   * @returns {Promise<IShowGenreObject[]>} Show's genres.
   */
  async getShowGenres(showId: number): Promise<IShowGenreObject[]> {
    try {
      const response = await this._find({
        showId,
      });

      const showGenres = [] as IShowGenreObject[];

      for (let i = 0; i < response.length; i += 1) {
        const genre = await Genre._findOne({
          id: response[i].genreId,
        }) as IGenre;

        showGenres.push({
          genreId: response[i].genreId,
          name: genre.name,
        } as IShowGenreObject);
      }

      return showGenres;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Gets shows with a genre.
   *
   * @param {number} genreId Genre's Id.
   * @returns {Promise<IGenreShowObject[]>} Shows with the genre.
   */
  async getGenreShows(genreId: number): Promise<IGenreShowObject[]> {
    try {
      const response = await this._find({
        genreId,
      });

      const genreShows = [] as IGenreShowObject[];

      for (let i = 0; i < response.length; i += 1) {
        const show = await Show._findOne({
          id: response[i].showId,
        }) as IShow;

        genreShows.push({
          showId: response[i].showId,
          name: show.name,
          type: show.type,
          posterUrl: show.posterUrl,
          backdropUrl: show.backdropUrl,
          releaseDate: show.releaseDate,
          overview: show.overview,
        } as IGenreShowObject);
      }

      return genreShows;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}
