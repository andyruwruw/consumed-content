// Local Imports
import {
  Show,
  User,
} from './index';
import { DataAccessObject } from './dao';

// Types
import {
  IShow,
  IShowUserObject,
  IUser,
  IUserShow,
  IUserShowObject,
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
   * Returns whether a show is already added.
   *
   * @param {number} userId User's Id.
   * @param {number} showId Show's Id.
   * @returns {Promise<boolean>} Whether the show is already added.
   */
   async isShowAdded(
    userId: number,
    showId: number,
  ): Promise<boolean> {
    try {
      const response = await this._findOne({
        userId,
        showId,
      });

      return response !== null;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  /**
   * Retrieves all shows for a user.
   *
   * @param {number} userId User's Id.
   * @returns {Promise<IUserShowObject[]>} Shows for the user.
   */
  async getUserShows(userId: number): Promise<IUserShowObject[]> {
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
   * @returns {Promise<IUserShowObject[]>} Movies for the user.
   */
  async getUserMovies(userId: number): Promise<IUserShowObject[]> {
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
   * @returns {Promise<IUserShowObject[]>} TV shows for the user.
   */
  async getUserTvShows(userId: number): Promise<IUserShowObject[]> {
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
   * @returns {Promise<IShowUserObject[]>} TV shows for the user.
   */
  async getShowUsers(showId: number): Promise<IShowUserObject[]> {
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
   * @returns {IUserShowObject[]} Cooresponding IUserShowObjects.
   */
  async _getShowsFromUserShows(userShows: IUserShow[]): Promise<IUserShowObject[]> {
    const shows = [] as IUserShowObject[];

    for (let i = 0; i < userShows.length; i += 1) {
      const show = await Show._findOne({
        id: userShows[i].showId,
      }) as IShow;

      shows.push({
        id: show.id,
        added: userShows[i].added,
        ...show,
      });
    }

    return shows;
  }

  /**
   * Retrieves shows for UserShows.
   *
   * @param {IUserShow[]} userShows List of UserShows.
   * @returns {IShowUserObject[]} Cooresponding IShowUserObjects.
   */
   async _getUsersFromUserShows(userShows: IUserShow[]): Promise<IShowUserObject[]> {
    const users = [] as IShowUserObject[];

    for (let i = 0; i < userShows.length; i += 1) {
      const user = await User._findOne({
        id: userShows[i].userId,
      }) as IUser;

      users.push({
        added: userShows[i].added,
        userId: user.id,
        username: user.username,
        imageUrl: user.imageUrl,
      });
    }

    return users;
  }
}
