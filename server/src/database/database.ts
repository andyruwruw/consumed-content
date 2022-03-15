// Local Imports
import api from '../api';
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

  async _addGenres(): Promise<number[]> {
    try {
      console.log('Adding Genres');

      const existing = await this.genre.getAll();
      const existingMap = {} as Record<number, boolean>;

      for (let i = 0; i < existing.length; i += 1) {
        existingMap[existing[i].id] = true;
      }

      const fullGenres = [
        api.themoviedb.genre.getMovieGenres(),
        api.themoviedb.genre.getTvShowGenres(),
      ];

      const [
        movieGenres,
        tvShowGenres,
      ] = await Promise.all(fullGenres);

      const genresAdding = [] as number[];

      const pending = [];

      if (movieGenres) {
        for (let i = 0; i < movieGenres.genres.length; i += 1) {
          const genre = movieGenres.genres[i];

          if (!existingMap[genre.id] && !genresAdding.includes(genre.id)) {
            pending.push(this.genre.insert(
              genre.id,
              genre.name,
            ));
          }

          genresAdding.push(genre.id);
        }
      }

      if (tvShowGenres) {
        for (let i = 0; i < tvShowGenres.genres.length; i += 1) {
          const genre = tvShowGenres.genres[i];

          if (!existingMap[genre.id] && !genresAdding.includes(genre.id)) {
            pending.push(this.genre.insert(
              genre.id,
              genre.name,
            ));
          }

          genresAdding.push(genre.id);
        }
      }

      console.log(`${pending.length} genres added`);

      return Promise.all(pending);
    } catch (error) {
      console.log(error);
    }
  }
}
