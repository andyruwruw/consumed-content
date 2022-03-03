// Local Imports
import { DataAccessObject } from './dao';
import { Show } from './index';

// Types
import {
  ICategoryShow,
  IShow,
} from '../../../../../shared/types';
import { ICategoryShowDAO } from '../../../types';

export class CategoryShow extends DataAccessObject<ICategoryShow> implements ICategoryShowDAO {
  /**
   * Inserts a new item.
   *
   * @param {number} categoryId Category's Id.
   * @param {number} showId Show's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async add(
    categoryId: number,
    showId: number,
  ): Promise<number> {
    try {
      const response = await this._insert({
        categoryId,
        showId,
        added: (new Date()).getTime(),
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Deletes a new item.
   *
   * @param {number} categoryId Category's Id.
   * @param {number} showId Show's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async remove(
    categoryId: number,
    showId: number,
  ): Promise<number> {
    try {
      const response = this._delete({
        categoryId,
        showId,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Get a category's shows.
   *
   * @param {number} categoryId Category's Id.
   * @returns {Promise<IShow[]>} Shows from category.
   */
  async selectCategoryShows(categoryId: number): Promise<IShow[]> {
    try {
      const response = await this._find({
        categoryId,
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
