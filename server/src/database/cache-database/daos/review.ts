// Local Imports
import { DataAccessObject } from './dao';

// Types
import { IReview } from '../../../../../shared/types';
import { IReviewDAO } from '../../../types';

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
      const response = await this._insert({
        showId,
        userId,
        name,
        rating,
        description,
        created: (new Date()).getTime(),
        updated: (new Date()).getTime(),
      });

      return response;
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
      const response = this._delete({
        id,
      });

      return response;
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
      const response = await this._update({
        id,
      }, {
        name,
        rating,
        description,
      });

      return response;
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
      const response = await this._find({
        userId,
      });

      return response as IReview[];
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
      const response = await this._find({
        showId,
      });

      return response as IReview[];
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}
