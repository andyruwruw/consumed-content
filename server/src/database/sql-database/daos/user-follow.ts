// Local Imports
import {
  CREATE_USER_FOLLOW_TABLE,
  DELETE_ALL_ROWS,
  DELETE_USER_FOLLOW,
  DROP_USER_FOLLOW_TABLE,
  INSERT_USER_FOLLOW,
  SELECT_USER_FOLLOWERS,
  SELECT_USER_FOLLOWINGS,
} from '../queries/user-follow';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import {
  IUserFollow,
  IUserFollowObject,
} from '../../../../../shared/types';
import { IUserFollowDAO } from '../../../types';

/**
 * Data Access Object for UserFollow.
 */
export class UserFollow extends DataAccessObject<IUserFollow> implements IUserFollowDAO {
  /**
   * Adds a new user follow.
   *
   * @param {number} userId User's Id.
   * @param {number} followingUserId User to follow's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async follow(
    userId: number,
    followingUserId: number,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...INSERT_USER_FOLLOW(
        userId,
        followingUserId,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Removes a user follow.
   *
   * @param {number} userId User's Id.
   * @param {number} followingUserId User being followed.
   * @returns {Promise<number>} Number of affected rows.
   */
  async unfollow(
    userId: number,
    followingUserId: number,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...DELETE_USER_FOLLOW(
        userId,
        followingUserId,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Retrieves a User's followers.
   *
   * @param {number} userId User's Id.
   * @returns {Promise<IUserFollowObject[]>} Array of users.
   */
  async getFollowers(userId: number): Promise<IUserFollowObject[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_USER_FOLLOWERS(
        userId,
      ));

      return response;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Retrieves who a User follows..
   *
   * @param {number} userId User's Id.
   * @returns {Promise<IUserFollowObject[]>} Array of users.
   */
  async getFollowings(userId: number): Promise<IUserFollowObject[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_USER_FOLLOWINGS(
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
    return CREATE_USER_FOLLOW_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_USER_FOLLOW_TABLE;
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
    return 'UserFollow';
  }
}
