// Local Imports
import { User } from './index';
import { DataAccessObject } from './dao';

// Types
import {
  IUser,
  IUserFollow,
  IUserFollowObject,
} from '../../../../../shared/types';
import { IUserFollowDAO } from '../../../types';

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
      const response = await this._insert({
        userId,
        followingUserId,
      });

      return response;
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
      const response = this._delete({
        userId,
        followingUserId,
      });

      return response;
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
      const response = await this._find({
        followingUserId: userId,
      });

      const userFollowers = [] as IUserFollowObject[];

      for (let i = 0; i < response.length; i += 1) {
        const user = await User._findOne({
          id: response[i].userId,
        }) as IUser;

        userFollowers.push({
          id: user.id,
          username: user.username,
          imageUrl: user.imageUrl,
        });
      }

      return userFollowers;
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
      const response = await this._find({
        userId,
      });

      const userFollowings = [] as IUserFollowObject[];

      for (let i = 0; i < response.length; i += 1) {
        const user = await User._findOne({
          id: response[i].followingUserId,
        }) as IUser;

        userFollowings.push({
          id: user.id,
          username: user.username,
          imageUrl: user.imageUrl,
        });
      }

      return userFollowings;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}
