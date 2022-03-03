// Local Imports
import { DataAccessObject } from './dao';

// Types
import { IUserToken } from '../../../../../shared/types';
import { IUserTokenDAO } from '../../../types';

export class UserToken extends DataAccessObject<IUserToken> implements IUserTokenDAO {
  /**
   * Registers a valid token.
   *
   * @param {number} userId User's Id.
   * @param {string} token Login token.
   * @returns {Promise<number>} Number of affected rows.
   */
  async register(userId: number, token: string): Promise<number> {
    try {
      const response = await this._insert({
        userId,
        token,
      });

      return response;
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
  async revoke(userId: number, token: string): Promise<number> {
    try {
      const response = await this._delete({
        userId,
        token,
      });

      return response;
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
      const response = await this._delete({
        userId,
      });

      return response;
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
  async validate(userId: number, token: string): Promise<boolean> {
    try {
      const response = await this._findOne({
        userId,
        token,
      });

      return response !== null;
    } catch (error) {
      console.log(error);
    }
    return false;
  }
}
