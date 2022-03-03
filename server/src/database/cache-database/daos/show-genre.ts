// Local Imports
import {
  Genre,
  Show,
} from './index';
import { DataAccessObject } from './dao';

// Types
import {
  IGenre,
  IShow,
  IShowGenre,
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
   * @returns {Promise<IGenre[]>} Show's genres.
   */
  async getShowGenres(showId: number): Promise<IGenre[]> {
    try {
      const response = await this._find({
        showId,
      });

      const genres = [] as IGenre[];

      for (let i = 0; i < response.length; i += 1) {
        genres.push(await Genre._findOne({
          id: response[i].genreId,
        }) as IGenre);
      }

      return genres;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Gets shows with a genre.
   *
   * @param {number} genreId Genre's Id.
   * @returns {Promise<IShow[]>} Shows with the genre.
   */
  async getGenreShows(genreId: number): Promise<IShow[]> {
    try {
      const response = await this._find({
        genreId,
      });

      const shows = [] as IShow[];

      for (let i = 0; i < response.length; i += 1) {
        shows.push(await Show._findOne({
          id: response[i].showId,
        }) as IShow);
      }

      return shows;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}
