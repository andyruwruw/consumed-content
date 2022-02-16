// Local Imports
import { Database } from '../database';
import {
  CategoryShow,
  Category,
  Genre,
  Platform,
  Review,
  Show,
  ShowGenre,
  ShowPlatform,
  User,
  UserFollow,
  UserShow,
  UserToken,
} from './daos';

/**
 * Concrete Database implementation for SQL Database.
 */
export class CacheDatabase extends Database {
  /**
   * Whether the database instance is connected.
   *
   * @returns {boolean} Whether the database instance is connected.
   */
  isConnected(): boolean {
    return true;
  }

  /**
   * Sets DAO instances.
   */
  _initializeDaos(): void {
    this.categoryShow = CategoryShow;
    this.category = Category;
    this.genre = Genre;
    this.platform = Platform;
    this.review = Review;
    this.showGenre = ShowGenre;
    this.showPlatform = ShowPlatform;
    this.show = Show;
    this.userFollow = UserFollow;
    this.userShow = UserShow;
    this.userToken = UserToken;
    this.user = User;
  }
}
