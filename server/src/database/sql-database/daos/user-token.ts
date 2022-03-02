// Local Imports
import {
  CREATE_USER_TOKEN_TABLE,
  DELETE_TOKEN,
  DELETE_USERS_TOKENS,
  DROP_USER_TOKEN_TABLE,
  INSERT_USER_TOKEN,
  SELECT_TOKEN,
} from '../queries/user-token';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import { IUserToken } from '../../../../../shared/types';

/**
 * Data Access Object for UserToken.
 */
export class UserToken extends DataAccessObject<IUserToken> {
  /**
   * Registers a valid token.
   *
   * @param {number} userId User's Id.
   * @param {string} token Login token.
   * @returns {Promise<number>} Number of affected rows.
   */
  async register(
    userId: number,
    token: string,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...INSERT_USER_TOKEN(
        userId,
        token,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Revokes a valid token.
   *
   * @param {number} userId User's Id.
   * @param {string} token Login token.
   * @returns {Promise<number>} Number of affected rows.
   */
  async revoke(
    userId: number,
    token: string,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...DELETE_TOKEN(
        userId,
        token,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Revokes a user's token.
   *
   * @param {number} userId User's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async revokeUser(userId: number): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...DELETE_USERS_TOKENS(
        userId,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Checks if a token is valid.
   *
   * @param {number} userId User's Id.
   * @param {string} token Login token.
   * @returns {boolean} Whether the token is valid.
   */
  async validate(
    userId: number,
    token: string,
  ): Promise<boolean> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_TOKEN(
        userId,
        token,
      ));

      return response.length > 0;
    } catch (error) {
      console.log(error)
    }
    return false;
  }


  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_USER_TOKEN_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_USER_TOKEN_TABLE;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'UserToken';
  }
}
