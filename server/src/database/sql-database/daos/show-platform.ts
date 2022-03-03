// Local Imports
import {
  CREATE_SHOW_PLATFORM_TABLE,
  DELETE_ALL_ROWS,
  DELETE_SHOW_PLATFORM,
  DROP_SHOW_PLATFORM_TABLE,
  INSERT_SHOW_PLATFORM,
  SELECT_PLATFORMS_SHOWS,
  SELECT_SHOWS_PLATFORMS,
} from '../queries/show-platform';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import {
  IPlatform,
  IShow,
  IShowPlatform,
} from '../../../../../shared/types';
import { IShowPlatformDAO } from '../../../types';

/**
 * Data Access Object for ShowPlatform.
 */
export class ShowPlatform extends DataAccessObject<IShowPlatform> implements IShowPlatformDAO {
  /**
   * Adds a new show platform.
   *
   * @param {number} showId Show's Id.
   * @param {number} platformId Platform's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async add(
    showId: number,
    platformId: number,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...INSERT_SHOW_PLATFORM(
        showId,
        platformId,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Remove a show platform.
   *
   * @param {number} showId Show's Id.
   * @param {number} platformId Platform's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async remove(
    showId: number,
    platformId: number,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...DELETE_SHOW_PLATFORM(
        showId,
        platformId,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Gets the platforms a show is on.
   *
   * @param {number} showId Show's Id.
   * @returns {Promise<IPlatform[]>} Platforms the show is on.
   */
  async getShowPlatforms(showId: number): Promise<IPlatform[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_SHOWS_PLATFORMS(
        showId,
      ));

      return response;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Gets shows on a platform.
   *
   * @param {number} platformId Platform's Id.
   * @returns {Promise<IShow[]>} Shows on a platform.
   */
  async getPlatformShows(platformId: number): Promise<IShow[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_PLATFORMS_SHOWS(
        platformId,
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
    return CREATE_SHOW_PLATFORM_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_SHOW_PLATFORM_TABLE;
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
    return 'ShowPlatform';
  }
}
