import { DataAccessObject } from './dao';

// Types
import { IPublicUserObject, IUser } from '../../../../../shared/types';
import { IUserDAO } from '../../../types';

/**
 * Projection used to protect private data.
 */
const PRIVATE_PROJECTION = {
  name: true,
  username: true,
  private: true,
  imageUrl: true,
};

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
      const response = this._insert({
        name,
        username,
        password,
        private: privateMode,
        imageUrl,
        joined: (new Date()).getTime(),
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  /**
   * Finds an User based off a Id.
   *
   * @param {number} id User's Id.
   * @returns {Promise<IPublicUserObject | null>} User public data.
   */
  async getUser(id: number): Promise<IPublicUserObject | null> {
    try {
      const response = await this._findOne({
        id,
      }, PRIVATE_PROJECTION);

      return {
        id: response.id,
        name: response.name,
        username: response.username,
        private: response.private,
        imageUrl: response.imageUrl,
        joined: response.joined,
      } as IPublicUserObject;
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
      const response = await this._findOne({
        id,
      });

      return response as IUser;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Finds an User based off a username.
   *
   * @param {string} username User's username.
   * @returns {Promise<IPublicUserObject | null>} User public data.
   */
  async getUserByUsername(username: string): Promise<IPublicUserObject | null> {
    try {
      const response = await this._findOne({
        username,
      }, PRIVATE_PROJECTION);

      return {
        id: response.id,
        name: response.name,
        username: response.username,
        private: response.private,
        imageUrl: response.imageUrl,
        joined: response.joined,
      } as IPublicUserObject;
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
      const response = await this._findOne({
        username,
      });

      return response as IUser;
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
   * @returns {Promise<number>} Number of rows affected.
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
      const response = await this._update({
        id,
      }, {
        name,
        username,
        password,
        privateMode,
        imageUrl,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }
}
