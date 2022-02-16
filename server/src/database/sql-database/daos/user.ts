// Local Imports
import {
  CREATE_USER_TABLE,
  INSERT_USER,
} from '../queries/user';
import { DataAccessObject } from './dao';

// Types
import { IUser } from '../../../../../shared/types';

/**
 * Data Access Object for Genre.
 */
export class User extends DataAccessObject<IUser> {
  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_USER_TABLE;
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getInsertQuery(): string {
    return INSERT_USER;
  }
}
