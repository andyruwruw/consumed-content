// Local Imports
import {
  CREATE_SHOW_TABLE,
  INSERT_SHOW,
} from '../queries/show';
import { DataAccessObject } from './dao';

// Types
import { IShow } from '../../../../../shared/types';

/**
 * Data Access Object for Show.
 */
export class Show extends DataAccessObject<IShow> {
  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_SHOW_TABLE;
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getInsertQuery(): string {
    return INSERT_SHOW;
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
