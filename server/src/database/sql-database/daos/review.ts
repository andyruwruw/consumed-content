// Local Imports
import {
  CREATE_REVIEW_TABLE,
  DELETE_ALL_ROWS,
  DELETE_REVIEW,
  DROP_REVIEW_TABLE,
  INSERT_REVIEW,
  SELECT_REVIEW,
  SELECT_SHOWS_REVIEWS,
  SELECT_USERS_REVIEWS,
  SELECT_USER_REVIEW,
  UPDATE_REVIEW,
} from '../queries/review';
import { ConnectionManager } from '../connection-manager';
import { DataAccessObject } from './dao';

// Types
import {
  IReview,
  IShowReviewObject,
  IUserReviewObject,
} from '../../../../../shared/types';
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
   * Retrieves a review by ID.
   *
   * @param {number} id Review Id.
   * @returns {IUserReviewObject}
   */
  async getById(id: number): Promise<IUserReviewObject> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_REVIEW(
        id,
      ));
 
      if (response.length > 0) {
        return response[0] as IUserReviewObject;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Retrieves a user's review of a show.
   *
   * @param {number} userId User's Id.
   * @param {number} showId Show's Id.
   * @returns {Promise<IUserReviewObject>} The review.
   */
  async getUserShowReview(
    userId: number,
    showId: number,
  ): Promise<IUserReviewObject> {
    try {
      const response = await ConnectionManager.connection.query(...SELECT_USER_REVIEW(
        userId,
        showId,
      ));

      if (response.length > 0) {
        return response[0] as IUserReviewObject;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
 }

  /**
   * Retrieves reviews from a user.
   * 
   * @param {number} userId User's Id.
   * @returns {Promise<IUserReviewObject[]>} Reviews for the user.
   */
  async getUserReviews(userId: number): Promise<IUserReviewObject[]> {
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
   * @returns {Promise<IShowReviewObject[]>} Reviews for the user.
   */
  async getShowReviews(showId: number): Promise<IShowReviewObject[]> {
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
