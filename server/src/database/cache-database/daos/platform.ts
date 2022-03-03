// Local Imports
import { DataAccessObject } from './dao';

// Types
import { IPlatform } from '../../../../../shared/types';
import { IPlatformDAO } from '../../../types';

export class Platform extends DataAccessObject<IPlatform> implements IPlatformDAO {
  /**
   * Adds a new platform to the database.
   *
   * @param {string} name Platform name.
   * @param {string} imageUrl Icon for the platform. 
   * @param {string} cost Monthly cost of platform.
   * @returns {Promise<number>} Number of affected rows.
   */
  async create(
    name: string,
    imageUrl: string,
    cost: number,
  ): Promise<number> {
    try {
      const response = await this._insert({
        name,
        imageUrl,
        cost,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Deletes a platform.
   *
   * @param {number} id Platform's Id.
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
   * Updates a platform.
   *
   * @param {number} id Platform's Id.
   * @param {string} name Platform name.
   * @param {string} imageUrl Icon for the platform. 
   * @param {number} cost Monthly cost of platform.
   * @returns {Promise<number>} Number of affected rows.
   */
  async update(
    id: number,
    name: string,
    imageUrl: string,
    cost: number,
  ): Promise<number> {
    try {
      const response = await this._update({
        id,
      }, {
        name,
        imageUrl,
        cost,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }
}
