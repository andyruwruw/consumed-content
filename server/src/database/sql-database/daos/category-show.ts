// Local Imports
import {
  CREATE_CATEGORY_SHOW_TABLE,
  INSERT_CATEGORY_SHOW,
} from '../queries/category-show';
import { DataAccessObject } from './dao';

// Types
import { ICategoryShow } from '../../../../../shared/types';

/**
 * Data Access Object for CategoryShow.
 */
export class CategoryShow extends DataAccessObject<ICategoryShow> {
  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_CATEGORY_SHOW_TABLE;
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getInsertQuery(): string {
    return INSERT_CATEGORY_SHOW;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'CategoryShow';
  }
}
