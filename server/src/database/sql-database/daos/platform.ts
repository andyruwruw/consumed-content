// Local Imports
import {
  CREATE_PLATFORM_TABLE,
  INSERT_PLATFORM,
} from '../queries/platform';
import { DataAccessObject } from './dao';

// Types
import { IPlatform } from '../../../../../shared/types';

/**
 * Data Access Object for Platform.
 */
export class Platform extends DataAccessObject<IPlatform> {
  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_PLATFORM_TABLE;
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getInsertQuery(): string {
    return INSERT_PLATFORM;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'Platform';
  }
}
