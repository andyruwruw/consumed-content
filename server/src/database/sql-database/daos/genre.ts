// Local Imports
import {
  CREATE_GENRE_TABLE,
  DELETE_ALL_ROWS,
  DROP_GENRE_TABLE,
  INSERT_GENRE,
  SELECT_GENRE,
  SELECT_GENRES,
} from '../queries/genre';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import { IGenre } from '../../../../../shared/types';
import { IGenreDAO } from '../../../types';

/**
 * Data Access Object for Genre.
 */
export class Genre extends DataAccessObject<IGenre> implements IGenreDAO {
  /**
   * Inserts a new row of the item.
   *
   * @param {number} id Genre's Id.
   * @param {string} name Name of the item.
   * @returns {Promise<number>} Number of affected rows.
   */
  async insert(
    id: number,
    name: string,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...INSERT_GENRE(
        id,
        name,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Selects an item based on Id.
   *
   * @param {number} id Genre's Id.
   * @returns {Promise<IGenre | null>} Genre or null.
   */
  async select(id: number): Promise<IGenre | null> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_GENRE(
        id,
      ));

      if (response.length > 0) {
        return response[0] as IGenre;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Selects all Genres
   *
   * @returns {Promise<IGenre[]>} Genre or null.
   */
  async getAll(): Promise<IGenre[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_GENRES());

      if (response.length > 0) {
        return response as IGenre[];
      }
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
    return CREATE_GENRE_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_GENRE_TABLE;
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
    return 'Genre';
  }
}
