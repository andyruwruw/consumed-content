// Local Imports
import {
  CREATE_USER_SHOW_TABLE,
  INSERT_USER_SHOW,
} from '../queries/user-show';
import { DataAccessObject } from './dao';

// Types
import { IUserShow } from '../../../../../shared/types';

/**
 * Data Access Object for UserShow.
 */
export class UserShow extends DataAccessObject<IUserShow> {
  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_USER_SHOW_TABLE;
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getInsertQuery(): string {
    return INSERT_USER_SHOW;
  }
}
