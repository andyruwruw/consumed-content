// Local Imports
import {
  Platform,
  Show,
} from './index';
import { DataAccessObject } from './dao';

// Types
import {
  IPlatform,
  IShow,
  IShowPlatform,
} from '../../../../../shared/types';
import { IShowPlatformDAO } from '../../../types';

export class ShowPlatform extends DataAccessObject<IShowPlatform> implements IShowPlatformDAO {
  /**
   * Adds a new show platform.
   *
   * @param {number} showId Show's Id.
   * @param {number} platformId Platform's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async add(
    showId: number,
    platformId: number,
  ): Promise<number> {
    try {
      const response = await this._insert({
        showId,
        platformId,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Remove a show platform.
   *
   * @param {number} showId Show's Id.
   * @param {number} platformId Platform's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async remove(
    showId: number,
    platformId: number,
  ): Promise<number> {
    try {
      const response = this._delete({
        showId,
        platformId,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Gets the platforms a show is on.
   *
   * @param {number} showId Show's Id.
   * @returns {Promise<IPlatform[]>} Platforms the show is on.
   */
  async getShowPlatforms(showId: number): Promise<IPlatform[]> {
    try {
      const response = await this._find({
        showId,
      });

      const platforms = [] as IPlatform[];

      for (let i = 0; i < response.length; i += 1) {
        platforms.push(await Platform._findOne({
          id: response[i].platformId,
        }) as IPlatform);
      }

      return platforms;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Gets shows on a platform.
   *
   * @param {number} platformId Platform's Id.
   * @returns {Promise<IShow[]>} Shows on a platform.
   */
  async getPlatformShows(platformId: number): Promise<IShow[]> {
    try {
      const response = await this._find({
        platformId,
      });

      const shows = [] as IShow[];

      for (let i = 0; i < response.length; i += 1) {
        shows.push(await Show._findOne({
          id: response[i].showId,
        }) as IShow);
      }

      return shows;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}
