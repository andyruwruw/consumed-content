// Local Imports
import {
  CREATE_CATEGORY_SHOW_TABLE,
  DELETE_ALL_ROWS,
  DELETE_CATEGORY_SHOW,
  DROP_CATEGORY_SHOW_TABLE,
  INSERT_CATEGORY_SHOW,
  SELECT_CATEGORY_SHOWS,
} from '../queries/category-show';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import {
  ICategoryShow,
  ICategoryShowObject,
} from '../../../../../shared/types';
import { ICategoryShowDAO } from '../../../types';

/**
 * Data Access Object for CategoryShow.
 */
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
      const response = await ConnectionManager.connection.query(...INSERT_CATEGORY_SHOW(
        categoryId,
        showId,
      ));

      return response.affectedRows;
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
      const response = await ConnectionManager.connection.query(...DELETE_CATEGORY_SHOW(
        categoryId,
        showId,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Get a category's shows.
   *
   * @param {number} categoryId Category's Id.
   * @returns {Promise<ICategoryShowObject[]>} Shows from category.
   */
  async selectCategoryShows(categoryId: number): Promise<ICategoryShowObject[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_CATEGORY_SHOWS(
        categoryId,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_CATEGORY_SHOW_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_CATEGORY_SHOW_TABLE;
  }

  /**
   * Retrieves delete all rows query for object.
   * 
   * @returns {string} SQL query for deleting all rows.
   */
  _getDeleteAllQuery(): string {
    return DELETE_ALL_ROWS;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'CategoryShow';
  }
}
