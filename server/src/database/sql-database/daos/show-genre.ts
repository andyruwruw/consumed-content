// Local Imports
import {
  CREATE_SHOW_GENRE_TABLE,
  DROP_SHOW_GENRE_TABLE,
  INSERT_SHOW_GENRE,
} from '../queries/show-genre';
import { DataAccessObject } from './dao';

// Types
import { IShowGenre } from '../../../../../shared/types';

/**
 * Data Access Object for ShowGenre.
 */
export class ShowGenre extends DataAccessObject<IShowGenre> {
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
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'ShowGenre';
  }
}
