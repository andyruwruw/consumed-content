// Local Imports
import {
  CREATE_USER_TABLE,
  DELETE_ALL_ROWS,
  DROP_USER_TABLE,
  INSERT_USER,
  SELECT_PRIVATE_USER_BY_ID,
  SELECT_PRIVATE_USER_BY_USERNAME,
  SELECT_PUBLIC_USER_BY_ID,
  SELECT_PUBLIC_USER_BY_USERNAME,
  UPDATE_USER,
} from '../queries/users';
import { DataAccessObject } from './dao';
import { ConnectionManager } from '../connection-manager';

// Types
import {
  IPublicUserObject,
  IUser,
} from '../../../../../shared/types';
import { IUserDAO } from '../../../types';

/**
 * Data Access Object for User.
 */
export class User extends DataAccessObject<IUser> implements IUserDAO {
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
   * @returns {Promise<IPublicUserObject | null>} User public data.
   */
  async getUser(id: number): Promise<IPublicUserObject | null> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_PUBLIC_USER_BY_ID(id));

      if (response.length > 0) {
        return response[0] as IPublicUserObject;
      }
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

      if (response.length > 0) {
        return response[0] as IUser;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Finds an User based off a username.
   *
   * @param {string} username User's username.
   * @returns {Promise<IPublicUser | null>} User public data.
   */
  async getUserByUsername(username: string): Promise<IPublicUserObject | null> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_PUBLIC_USER_BY_USERNAME(username));

      if (response.length > 0) {
        return response[0] as IPublicUserObject;
      }
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

      if (response.length > 0) {
        return response[0] as IUser;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Updates a user's information.
   * 
   * @param {number} id User's Id.
   * @param {string} name User's name.
   * @param {string} username User's username.
   * @param {string} password User's password.
   * @param {boolean} privateMode User's privacy settings.
   * @param {string} imageUrl User's image.
   * @returns {Promise<number>} Number of affected rows.
   */
  async update(
    id: number,
    name: string,
    username: string,
    password: string,
    privateMode: boolean,
    imageUrl: string,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...UPDATE_USER(
        id,
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
    return 'Users';
  }
}
