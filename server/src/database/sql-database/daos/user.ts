// Local Imports
import {
  CREATE_USER_TABLE,
  DROP_USER_TABLE,
  INSERT_USER,
  SELECT_PRIVATE_USER_BY_ID,
  SELECT_PRIVATE_USER_BY_USERNAME,
  SELECT_PUBLIC_USER_BY_ID,
  SELECT_PUBLIC_USER_BY_USERNAME,
} from '../queries/users';
import { DataAccessObject } from './dao';
import { ConnectionManager } from '../connection-manager';

// Types
import { IUser } from '../../../../../shared/types';

/**
 * Data Access Object for Genre.
 */
export class User extends DataAccessObject<IUser> {
  /**
   * Inserts a new user. It's expected that the password has been hashed and
   * it's been checked to ensure that another user with the same username
   * doesn't already exist.
   *
   * @param {string} name User's name.
   * @param {string} username User's username.
   * @param {string} password User's password.
   * @param {boolean} privateMode User's privacy settings.
   * @param {string} imageUrl User's image.
   * @returns {Promise<number>} Created user.
   */
  async register(
    name: string,
    username: string,
    password: string,
    privateMode: boolean,
    imageUrl: string,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...INSERT_USER(
        name,
        username,
        password,
        privateMode,
        imageUrl,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Finds an User based off a Id.
   *
   * @param {number} id User's Id.
   * @returns {Promise<IUser | null>} User public data.
   */
  async getUser(id: number): Promise<IUser | null> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_PUBLIC_USER_BY_ID(id));

      return response;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Finds an User based off a Id.
   *
   * @param {number} id User's Id.
   * @returns {Promise<IUser | null>} User private data.
   */
  async getMe(id: number): Promise<IUser | null> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_PRIVATE_USER_BY_ID(id));

      return response;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Finds an User based off a username.
   *
   * @param {string} username User's username.
   * @returns {Promise<IUser | null>} User public data.
   */
  async getUserByUsername(username: string): Promise<IUser | null> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_PUBLIC_USER_BY_USERNAME(username));

      return response;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Finds an User based off a username.
   *
   * @param {string} username User's username.
   * @returns {Promise<IUser | null>} User private data.
   */
  async getMeByUsername(username: string): Promise<IUser | null> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_PRIVATE_USER_BY_USERNAME(username));

      return response;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_USER_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_USER_TABLE;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'Users';
  }
}
