// Local Imports
import {
  Show,
  User,
} from './index';
import { DataAccessObject } from './dao';

// Types
import {
  IShow,
  IUser,
  IUserShow,
} from '../../../../../shared/types';
import { IUserShowDAO } from '../../../types';

export class UserShow extends DataAccessObject<IUserShow> implements IUserShowDAO {
  /**
   * Adds a new user show.
   *
   * @param {number} userId User's Id.
   * @param {number} showId Show's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async add(
    userId: number,
    showId: number,
  ): Promise<number> {
    try {
      const response = await this._insert({
        userId,
        showId,
        added: (new Date()).getTime(),
      });

      return response;
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
  async remove(
    userId: number,
    showId: number,
  ): Promise<number> {
    try {
      const response = await this._delete({
        userId,
        showId,
      });

      return response;
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
      const response = await this._find({
        userId,
      });

      return await this._getShowsFromUserShows(response as IUserShow[]);
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
      const response = await this._find({
        userId,
        type: 'movie',
      });

      return await this._getShowsFromUserShows(response as IUserShow[]);
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
      const response = await this._find({
        userId,
        type: 'tv-show',
      });

      return await this._getShowsFromUserShows(response as IUserShow[]);
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Retrieves all Users who added a show.
   *
   * @param {number} showId Show's Id.
   * @returns {Promise<IUser[]>} TV shows for the user.
   */
  async getShowUsers(showId: number): Promise<IUser[]> {
    try {
      const response = await this._find({
        showId,
      });

      return await this._getUsersFromUserShows(response as IUserShow[]);
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Retrieves shows for UserShows.
   *
   * @param {IUserShow[]} userShows List of UserShows.
   * @returns {IShow[]} Cooresponding IShows.
   */
  async _getShowsFromUserShows(userShows: IUserShow[]): Promise<IShow[]> {
    const shows = [] as IShow[];

    for (let i = 0; i < userShows.length; i += 1) {
      shows.push(await Show._findOne({
        id: userShows[i].showId,
      }) as IShow);
    }

    return shows;
  }

  /**
   * Retrieves shows for UserShows.
   *
   * @param {IUserShow[]} userShows List of UserShows.
   * @returns {IUser[]} Cooresponding IUsers.
   */
   async _getUsersFromUserShows(userShows: IUserShow[]): Promise<IUser[]> {
    const users = [] as IUser[];

    for (let i = 0; i < userShows.length; i += 1) {
      users.push(await User._findOne({
        id: userShows[i].userId,
      }) as IUser);
    }

    return users;
  }
}
