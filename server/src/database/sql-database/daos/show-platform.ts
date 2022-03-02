// Local Imports
import {
  CREATE_SHOW_PLATFORM_TABLE,
  DROP_SHOW_PLATFORM_TABLE,
  INSERT_SHOW_PLATFORM,
} from '../queries/show-platform';
import { DataAccessObject } from './dao';

// Types
import { IShowPlatform } from '../../../../../shared/types';

/**
 * Data Access Object for ShowPlatform.
 */
export class ShowPlatform extends DataAccessObject<IShowPlatform> {
  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_SHOW_PLATFORM_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_SHOW_PLATFORM_TABLE;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'ShowPlatform';
  }
}
