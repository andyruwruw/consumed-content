// Local Imports
import {
  CREATE_PLATFORM_TABLE,
  DELETE_ALL_ROWS,
  DELETE_PLATFORM,
  DROP_PLATFORM_TABLE,
  INSERT_PLATFORM,
  UPDATE_PLATFORM,
} from '../queries/platform';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import { IPlatform } from '../../../../../shared/types';
import { IPlatformDAO } from '../../../types';

/**
 * Data Access Object for Platform.
 */
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
      const response = await ConnectionManager.connection.query(...INSERT_PLATFORM(
        name,
        imageUrl,
        cost,
      ));

      return response.affectedRows;
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
      const response = await ConnectionManager.connection.query(...DELETE_PLATFORM(
        id,
      ));

      return response.affectedRows;
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
      const response = await ConnectionManager.connection.query(...UPDATE_PLATFORM(
        id,
        name,
        imageUrl,
        cost,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_PLATFORM_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_PLATFORM_TABLE;
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
    return 'Platform';
  }
}
