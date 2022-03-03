// Local Imports
import {
  CREATE_REVIEW_TABLE,
  DELETE_ALL_ROWS,
  DELETE_REVIEW,
  DROP_REVIEW_TABLE,
  INSERT_REVIEW,
  SELECT_SHOWS_REVIEWS,
  SELECT_USERS_REVIEWS,
  UPDATE_REVIEW,
} from '../queries/review';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import { IReview } from '../../../../../shared/types';
import { IReviewDAO } from '../../../types';

/**
 * Data Access Object for Review.
 */
export class Review extends DataAccessObject<IReview> implements IReviewDAO {
  /**
   * Creates a new review.
   *
   * @param {number} showId Show's Id.
   * @param {number} userId User's Id.
   * @param {string} name Name of the review.
   * @param {number} rating Rating for the review.
   * @param {string} description Description of the review.
   * @returns {Promise<number>} Number of affected rows.
   */
  async create(
    showId: number,
    userId: number,
    name: string,
    rating: number,
    description: string,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...INSERT_REVIEW(
        showId,
        userId,
        name,
        rating,
        description,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Deletes a review.
   *
   * @param {number} id Review's Id.
   * @returns {Promise<number>} Number of affected rows.
   */
  async delete(id: number): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...DELETE_REVIEW(
        id,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Updates a review.
   *
   * @param {number} id Review's Id.
   * @param {string} name Name of the review.
   * @param {number} rating Rating for the review.
   * @param {string} description Description of the review.
   * @returns {Promise<number>} Number of affected rows.
   */
  async update(
    id: number,
    name: string,
    rating: number,
    description: string,
  ): Promise<number> {
    try {
      const response = await ConnectionManager.connection.query(...UPDATE_REVIEW(
        id,
        name,
        rating,
        description,
      ));

      return response.affectedRows;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  /**
   * Retrieves reviews from a user.
   * 
   * @param {number} userId User's Id.
   * @returns {Promise<IReview[]>} Reviews for the user.
   */
  async getUserReviews(userId: number): Promise<IReview[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_USERS_REVIEWS(
        userId,
      ));

      return response;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  /**
   * Retrieves a show's reviews.
   * 
   * @param {number} showId Show's Id.
   * @returns {Promise<IReview[]>} Reviews for the user.
   */
  async getShowReviews(showId: number): Promise<IReview[]> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_SHOWS_REVIEWS(
        showId,
      ));

      return response;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

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
   * Retrieves delete all rows query for object.
   * 
   * @returns {string} SQL query for deleting all rows.
   */
  _getDeleteAllQuery(): string {
    return DELETE_ALL_ROWS;
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
