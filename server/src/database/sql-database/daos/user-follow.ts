// Local Imports
import {
  CREATE_USER_FOLLOW_TABLE,
  DROP_USER_FOLLOW_TABLE,
  INSERT_USER_FOLLOW,
} from '../queries/user-follow';
import { DataAccessObject } from './dao';

// Types
import { IUserFollow } from '../../../../../shared/types';

/**
 * Data Access Object for UserFollow.
 */
export class UserFollow extends DataAccessObject<IUserFollow> {
  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_USER_FOLLOW_TABLE;
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_USER_FOLLOW_TABLE;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'UserFollow';
  }
}
