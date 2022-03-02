// Local Imports
import {
  CREATE_CATEGORY_TABLE,
  INSERT_CATEGORY,
} from '../queries/category';
import { DataAccessObject } from './dao';

// Types
import { ICategory } from '../../../../../shared/types';

/**
 * Data Access Object for Category.
 */
export class Category extends DataAccessObject<ICategory> {
  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_CATEGORY_TABLE;
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getInsertQuery(): string {
    return INSERT_CATEGORY;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'Category';
  }
}
