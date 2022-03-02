// Local Imports
import {
  CREATE_GENRE_TABLE,
  DROP_GENRE_TABLE,
  INSERT_GENRE,
} from '../queries/genre';
import { DataAccessObject } from './dao';

// Types
import { IGenre } from '../../../../../shared/types';
import { DROP_PLATFORM_TABLE } from '../queries/platform';

/**
 * Data Access Object for Genre.
 */
export class Genre extends DataAccessObject<IGenre> {
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
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'Genre';
  }
}
