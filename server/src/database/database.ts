// Local Imports
import { UsedAbstractDatabaseError } from '../errors/used-abstract-database-error';

// Types
import { IDataAccessObject } from '../types';
import {
  ICategory,
  ICategoryShow,
  IGenre,
  IPlatform,
  IReview,
  IShow,
  IShowGenre,
  IShowPlatform,
  IUser,
  IUserFollow,
  IUserShow,
  IUserToken,
} from '../../../shared/types';

/**
 * Abstract Database class.
 */
export class Database {
  /**
   * Data access object for category show.
   */
  categoryShow: IDataAccessObject<ICategoryShow>;

  /**
   * Data access object for category.
   */
  category: IDataAccessObject<ICategory>;

  /**
   * Data access object for genre.
   */
  genre: IDataAccessObject<IGenre>;

  /**
   * Data access object for platform.
   */
  platform: IDataAccessObject<IPlatform>;

  /**
   * Data access object for review.
   */
  review: IDataAccessObject<IReview>;

  /**
   * Data access object for show genre.
   */
  showGenre: IDataAccessObject<IShowGenre>;

  /**
   * Data access object for show platform.
   */
  showPlatform: IDataAccessObject<IShowPlatform>;

  /**
   * Data access object for show
   */
  show: IDataAccessObject<IShow>;

  /**
   * Data access object for user follow.
   */
  userFollow: IDataAccessObject<IUserFollow>;

  /**
   * Data access object for user show.
   */
  userShow: IDataAccessObject<IUserShow>;

  /**
   * Data access object for user token.
   */
  userToken: IDataAccessObject<IUserToken>;

  /**
   * Data access object for user.
   */
  user: IDataAccessObject<IUser>;

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
