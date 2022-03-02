// Local Imports
import {
  CREATE_USER_SHOW_TABLE,
  DELETE_USERS_SHOW,
  DROP_USER_SHOW_TABLE,
  INSERT_USER_SHOW,
  SELECT_SHOW_USERS,
  SELECT_USERS_MOVIES,
  SELECT_USERS_SHOWS,
  SELECT_USERS_TV_SHOWS,
} from '../queries/user-show';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import { IShow, IUserShow } from '../../../../../shared/types';

/**
 * Data Access Object for UserShow.
 */
export class UserShow extends DataAccessObject<IUserShow> {
  /**
   * Adds a new user show.
   *
   * @param {number} userId User's Id.
   * @param {number} showId Show's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
   async addShow(
    userId: number,
    showId: number,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...INSERT_USER_SHOW(
        userId,
        showId,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Removes an user show.
   *
   * @param {number} userId User's Id.
   * @param {number} showId Show's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async removeShow(
    userId: number,
    showId: number,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...DELETE_USERS_SHOW(
        userId,
        showId,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Retrieves all shows for a user.
   *
   * @param {number} userId User's Id.
   * @returns {Promise<IShow[]>} Shows for the user.
   */
  async getUserShows(userId: number): Promise<IShow[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_USERS_SHOWS(
        userId,
      ));

      return response;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Retrieves all movies for a user.
   *
   * @param {number} userId User's Id.
   * @returns {Promise<IShow[]>} Movies for the user.
   */
  async getUserMovies(userId: number): Promise<IShow[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_USERS_MOVIES(
        userId,
      ));

      return response;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Retrieves all TV shows for a user.
   *
   * @param {number} userId User's Id.
   * @returns {Promise<IShow[]>} TV shows for the user.
   */
  async getUserTvShows(userId: number): Promise<IShow[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_USERS_TV_SHOWS(
        userId,
      ));

      return response;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Retrieves all Users who added a show.
   *
   * @param {number} showId Show's Id.
   * @returns {Promise<IShow[]>} TV shows for the user.
   */
  async getShowUsers(showId: number): Promise<IShow[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_SHOW_USERS(
        showId,
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
    return CREATE_USER_SHOW_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_USER_SHOW_TABLE;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'UserShow';
  }
}
