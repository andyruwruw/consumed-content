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
    ConnectionManager.setConnection(await createConnection({
      host: Environment.getDatabaseHost(),
      user: Environment.getDatabaseUser(),
      password: Environment.getDatabasePassword(),
      port: 3306,
    }));

    await ConnectionManager.connection.query('CREATE DATABASE IF NOT EXISTS consumedcontent');

    await ConnectionManager.connection.query('USE consumedcontent');

    await Promise.all([
      this.genre.createTable(),
      this.platform.createTable(),
      this.show.createTable(),
      this.user.createTable(),
    ]);

    await Promise.all([
      this.category.createTable(),
      this.review.createTable(),
      this.showGenre.createTable(),
      this.showPlatform.createTable(),
      this.userFollow.createTable(),
      this.userShow.createTable(),
      this.userToken.createTable(),
    ]);

    await this.categoryShow.createTable();
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
