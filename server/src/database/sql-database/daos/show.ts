// Local Imports
import {
  CREATE_SHOW_TABLE,
  DELETE_ALL_ROWS,
  DELETE_SHOW,
  DROP_SHOW_TABLE,
  INSERT_SHOW,
  SELECT_SHOW,
} from '../queries/show';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import { IShow } from '../../../../../shared/types';
import { IShowDAO } from '../../../types';

/**
 * Data Access Object for Show.
 */
export class Show extends DataAccessObject<IShow> implements IShowDAO {
  /**
   * Adds a show to the database.
   *
   * @param {string} name Name of the show.
   * @param {string} type Type of show.
   * @param {string} posterUrl Poster image URL for show.
   * @param {string} backdropUrl Backdrop image URL for show.
   * @param {string} releaseDate Release date of show.
   * @param {string} overview Overview of show.
   * @returns {Promise<number>} Number of affected rows.
   */
  async add(
    name: string,
    type: string,
    posterUrl: string,
    backdropUrl: string,
    releaseDate: string,
    overview: string,
  ): Promise<number> {
    try {
      // Sanitize release date.

      const response = await ConnectionManager.connection.query(...INSERT_SHOW(
        name,
        type,
        posterUrl,
        backdropUrl,
        releaseDate,
        overview,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Deletes a show from the database.
   *
   * @param {number} id Show's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async delete(id: number): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...DELETE_SHOW(
        id,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Retrieves a show by Id.
   *
   * @param {number} id Show's Id.
   * @returns {Promise<IShow | null>} Show or null.
   */
  async select(id: number): Promise<IShow | null> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_SHOW(
        id,
      ));

      return response;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_SHOW_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_SHOW_TABLE;
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
    return 'Shows';
  }
}
