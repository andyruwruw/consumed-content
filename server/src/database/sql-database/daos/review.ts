// Local Imports
import {
  CREATE_REVIEW_TABLE,
  INSERT_REVIEW,
} from '../queries/review';
import { DataAccessObject } from './dao';

// Types
import { IReview } from '../../../../../shared/types';

/**
 * Data Access Object for Review.
 */
export class Review extends DataAccessObject<IReview> {
  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    return CREATE_REVIEW_TABLE;
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getInsertQuery(): string {
    return INSERT_REVIEW;
  }

  /**
   * Retrieves table name.
   * 
   * @returns {string} Name of the table.
   */
  _getTableName(): string {
    return 'Review';
  }
}
