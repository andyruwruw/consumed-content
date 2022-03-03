// Local Imports
import { DataAccessObject } from './dao';

// Types
import { IGenre } from '../../../../../shared/types';
import { IGenreDAO } from '../../../types';

export class Genre extends DataAccessObject<IGenre> implements IGenreDAO {
  /**
   * Inserts a new row of the item.
   *
   * @param {number} id Genre's Id.
   * @param {string} name Name of the item.
   * @returns {Promise<number>} Number of affected rows.
   */
  async insert(
    id: number,
    name: string,
  ): Promise<number> {
    try {
      const response = await this._insert({
        id,
        name,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Selects an item based on Id.
   *
   * @param {number} id Genre's Id.
   * @returns {Promise<IGenre | null>} Genre or null.
   */
  async select(id: number): Promise<IGenre> {
    try {
      const response = await this._findOne({
        id,
      });

      return response as IGenre;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}
