// Local Imports
import {
  CREATE_USER_TOKEN_TABLE,
  INSERT_USER_TOKEN,
} from '../queries/user-token';
import { DataAccessObject } from './dao';

// Types
import { IUserToken } from '../../../../../shared/types';

/**
 * Data Access Object for UserToken.
 */
export class UserToken extends DataAccessObject<IUserToken> {
  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_USER_TOKEN_TABLE;
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getInsertQuery(): string {
    return INSERT_USER_TOKEN;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'UserToken';
  }
}
