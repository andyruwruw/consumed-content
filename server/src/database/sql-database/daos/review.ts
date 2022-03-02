// Local Imports
import {
  CREATE_REVIEW_TABLE,
  DROP_REVIEW_TABLE,
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
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    return DROP_REVIEW_TABLE;
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
