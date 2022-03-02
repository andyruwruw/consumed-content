// Local Imports
import {
  CREATE_GENRE_TABLE,
  INSERT_GENRE,
} from '../queries/genre';
import { DataAccessObject } from './dao';

// Types
import { IGenre } from '../../../../../shared/types';

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
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getInsertQuery(): string {
    return INSERT_GENRE;
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
