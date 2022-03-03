// Local Imports
import {
  CREATE_CATEGORY_TABLE,
  DELETE_ALL_ROWS,
  DELETE_CATEGORY,
  DROP_CATEGORY_TABLE,
  INSERT_CATEGORY,
  SELECT_USER_CATEGORIES,
  UPDATE_CATEGORY,
} from '../queries/category';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import { ICategory } from '../../../../../shared/types';
import { ICategoryDAO } from '../../../types';

/**
 * Data Access Object for Category.
 */
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
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...INSERT_CATEGORY(
        userId,
        name,
        description,
      ));

      return response.affectedRows;
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
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...UPDATE_CATEGORY(
        id,
        name,
        description,
      ));

      return response.affectedRows;
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
  async delete(id: number): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...DELETE_CATEGORY(
        id,
      ));

      return response.affectedRows;
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
  async select(id: number): Promise<ICategory | null> {
    try {
      const response = await ConnectionManager.connection.query(...DELETE_CATEGORY(
        id,
      ));

      return response;
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
  async selectUserCategories(userId: number): Promise<ICategory[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_USER_CATEGORIES(
        userId,
      ));

      return response;
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
    return CREATE_CATEGORY_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_CATEGORY_TABLE;
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
    return 'Category';
  }
}
