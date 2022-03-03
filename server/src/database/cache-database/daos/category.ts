// Local Imports
import { DataAccessObject } from './dao';

// Types
import { ICategory } from '../../../../../shared/types';
import { ICategoryDAO } from '../../../types';

export class Category extends DataAccessObject<ICategory> implements ICategoryDAO {
  /**
   * Inserts a new row of the item.
   *
   * @param {number} userId User's Id.
   * @param {string} name Name of the item.
   * @param {string} description Description of the item.
   * @returns {Promise<number>} Number of affected rows.
   */
  async create(
    userId: number,
    name: string,
    description: string,
  ): Promise<number>{
    try {
      const response = await this._insert({
        userId,
        name,
        description,
        created: (new Date()).getTime(),
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Updates an item.
   *
   * @param {number} id Category's Id.
   * @param {string} name Name of the item.
   * @param {string} description Description of the item.
   */
  async update(
    id: number,
    name: string,
    description: string,
  ): Promise<number>{
    try {
      const response = this._update({
        id,
      }, {
        name,
        description,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Deletes an item.
   *
   * @param {number} id Category's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async delete(id: number): Promise<number>{
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
   * Selects an item.
   *
   * @param {number} id Category's Id.
   * @returns {Promise<ICategory | null>} Category or null.
   */
  async select(id: number): Promise<ICategory>{
    try {
      const response = await this._findOne({
        id,
      });

      return response as ICategory;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Selects items from user.
   *
   * @param {number} userId User's Id.
   * @returns {Promise<ICategory[]>} Categories from user..
   */
  async selectUserCategories(userId: number): Promise<ICategory[]>{
    try {
      const response = await this._find({
        userId,
      });

      return response as ICategory[];
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}
