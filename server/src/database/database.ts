// Local Imports
import { UsedAbstractDatabaseError } from '../errors/used-abstract-database-error';

// Types
import {
  ICategoryShowDAO,
  ICategoryDAO,
  IGenreDAO,
  IUserDAO,
  IPlatformDAO,
  IReviewDAO,
  IShowGenreDAO,
  IShowPlatformDAO,
  IShowDAO,
  IUserFollowDAO,
  IUserShowDAO,
  IUserTokenDAO,
} from '../types';

/**
 * Abstract Database class.
 */
export class Database {
  /**
   * Data access object for category show.
   */
  categoryShow: ICategoryShowDAO;

  /**
   * Data access object for category.
   */
  category: ICategoryDAO;

  /**
   * Data access object for genre.
   */
  genre: IGenreDAO;

  /**
   * Data access object for platform.
   */
  platform: IPlatformDAO;

  /**
   * Data access object for review.
   */
  review: IReviewDAO;

  /**
   * Data access object for show genre.
   */
  showGenre: IShowGenreDAO;

  /**
   * Data access object for show platform.
   */
  showPlatform: IShowPlatformDAO;

  /**
   * Data access object for show
   */
  show: IShowDAO;

  /**
   * Data access object for user follow.
   */
  userFollow: IUserFollowDAO;

  /**
   * Data access object for user show.
   */
  userShow: IUserShowDAO;

  /**
   * Data access object for user token.
   */
  userToken: IUserTokenDAO;

  /**
   * Data access object for user.
   */
  user: IUserDAO;

  /**
   * Instantiates a new SQL database instance.
   */
  constructor() {
    this._initializeDaos();
  }

  /**
   * Connects to the database.
   */
  async connect(): Promise<void> {
    throw new UsedAbstractDatabaseError();
  }

  /**
   * Whether the database instance is connected.
   *
   * @returns {boolean} Whether the database instance is connected.
   */
  isConnected(): boolean {
    return false;
  }

  /**
   * Sets DAO instances.
   */
  _initializeDaos(): void {
  }
}
