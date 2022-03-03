// Local Imports
import {
  CREATE_SHOW_GENRE_TABLE,
  DELETE_ALL_ROWS,
  DROP_SHOW_GENRE_TABLE,
  INSERT_SHOW_GENRE,
  SELECT_GENRES_SHOWS,
  SELECT_SHOWS_GENRES,
} from '../queries/show-genre';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import {
  IGenre,
  IShow,
  IShowGenre,
} from '../../../../../shared/types';
import { IShowGenreDAO } from '../../../types';

/**
 * Data Access Object for ShowGenre.
 */
export class ShowGenre extends DataAccessObject<IShowGenre> implements IShowGenreDAO {
  /**
   * Adds a genre to a show.
   *
   * @param {number} showId Show's Id.
   * @param {number} genreId Genre's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async add(
    showId: number,
    genreId: number,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...INSERT_SHOW_GENRE(
        showId,
        genreId,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Gets a show's genres.
   * 
   * @param {number} showId Show's Id.
   * @returns {Promise<IGenre[]>} Show's genres.
   */
  async getShowGenres(showId: number): Promise<IGenre[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_SHOWS_GENRES(
        showId,
      ));

      return response;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Gets shows with a genre.
   *
   * @param {number} genreId Genre's Id.
   * @returns {Promise<IShow[]>} Shows with the genre.
   */
  async getGenreShows(genreId: number): Promise<IShow[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_GENRES_SHOWS(
        genreId,
      ));

      return response;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_SHOW_GENRE_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_SHOW_GENRE_TABLE;
  }

  /**
   * Retrieves delete all rows query for object.
   * 
   * @returns {string} SQL query for deleting all rows.
   */
  _getDeleteAllQuery(): string {
    return DELETE_ALL_ROWS;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'ShowGenre';
  }
}
