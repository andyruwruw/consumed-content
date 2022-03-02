// Packages
import { createConnection } from 'mariadb';

// Local Imports
import { ConnectionManager } from './connection-manager';
import { Database } from '../database';
import { Environment } from '../../helpers/environment';
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
export class SQLDatabase extends Database {
  /**
   * Connects to the database.
   */
  async connect(): Promise<void> {
    const connection = await createConnection({
      host: Environment.getDatabaseHost(),
      user: Environment.getDatabaseUser(),
      password: Environment.getDatabasePassword(),
      port: 3306,
      database: 'consumed-content',
    });

    ConnectionManager.setConnection(connection);
  }

  /**
   * Whether the database instance is connected.
   *
   * @returns {boolean} Whether the database instance is connected.
   */
  isConnected(): boolean {
    return ConnectionManager.connection !== undefined;
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
