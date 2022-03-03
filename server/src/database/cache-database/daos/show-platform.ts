// Local Imports
import {
  Platform,
  Show,
} from './index';
import { DataAccessObject } from './dao';

// Types
import {
  IPlatform,
  IPlatformShowObject,
  IShow,
  IShowPlatform,
  IShowPlatformObject,
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
   * @returns {Promise<IShowPlatformObject[]>} Platforms the show is on.
   */
  async getShowPlatforms(showId: number): Promise<IShowPlatformObject[]> {
    try {
      const response = await this._find({
        showId,
      });

      const showPlatforms = [] as IShowPlatformObject[];

      for (let i = 0; i < response.length; i += 1) {
        const platform = await Platform._findOne({
          id: response[i].platformId,
        }) as IPlatform;

        showPlatforms.push({
          platformId: response[i].platformId,
          name: platform.name,
          imageUrl: platform.imageUrl,
          cost: platform.cost,
        } as IShowPlatformObject);
      }

      return showPlatforms;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Gets shows on a platform.
   *
   * @param {number} platformId Platform's Id.
   * @returns {Promise<IPlatformShowObject[]>} Shows on a platform.
   */
  async getPlatformShows(platformId: number): Promise<IPlatformShowObject[]> {
    try {
      const response = await this._find({
        platformId,
      });

      const platformShows = [] as IPlatformShowObject[];

      for (let i = 0; i < response.length; i += 1) {
        const show = await Show._findOne({
          id: response[i].showId,
        }) as IShow;

        platformShows.push({
          showId: response[i].showId,
          ...show,
        } as IPlatformShowObject);
      }

      return platformShows;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}
