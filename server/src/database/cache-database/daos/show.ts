// Local Imports
import { DataAccessObject } from './dao';

// Types
import { IShow } from '../../../../../shared/types';
import { IShowDAO } from '../../../types';

export class Show extends DataAccessObject<IShow> implements IShowDAO {
  /**
   * Adds a show to the database.
   *
   * @param {string} name Name of the show.
   * @param {string} type Type of show.
   * @param {string} posterUrl Poster image URL for show.
   * @param {string} backdropUrl Backdrop image URL for show.
   * @param {number} releaseDate Release date of show.
   * @param {string} overview Overview of show.
   * @returns {Promise<number>} Number of affected rows.
   */
  async add(
    name: string,
    type: string,
    posterUrl: string,
    backdropUrl: string,
    releaseDate: number,
    overview: string,
  ): Promise<number> {
    try {
      const response = await this._insert({
        name,
        type,
        posterUrl,
        backdropUrl,
        releaseDate,
        overview,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Deletes a show from the database.
   *
   * @param {number} id Show's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async delete(id: number): Promise<number> {
    try {
      const response = this._delete({
        id,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Retrieves a show by Id.
   *
   * @param {number} id Show's Id.
   * @returns {Promise<IShow | null>} Show or null.
   */
  async select(id: number): Promise<IShow | null> {
    try {
      const response = await this._findOne({
        id,
      });

      return response as IShow;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}
