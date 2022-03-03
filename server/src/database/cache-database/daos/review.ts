// Local Imports
import { DataAccessObject } from './dao';

// Types
import {
  IReview,
  IShowReviewObject,
  IUserReviewObject,
} from '../../../../../shared/types';
import { IReviewDAO } from '../../../types';
import { Show, User } from '.';

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
   * @returns {Promise<IUserReviewObject[]>} Reviews for the user.
   */
  async getUserReviews(userId: number): Promise<IUserReviewObject[]> {
    try {
      const reviews = await this._find({
        userId,
      });

      const userReviews = [] as IUserReviewObject[];

      for (let i = 0; i < reviews.length; i += 1) {
        const show = await Show._findOne({
          id: reviews[i].showId,
        });

        const user = await User._findOne({
          id: reviews[i].userId,
        });

        userReviews.push({
          ...reviews[i],
          showName: show.name,
          type: show.type,
          posterUrl: show.posterUrl,
          backdropUrl: show.backdropUrl,
          releaseDate: show.releaseDate,
          overview: show.overview,
          username: user.username,
          imageUrl: user.imageUrl,
        } as IUserReviewObject);
      }

      return userReviews;
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
      const reviews = await this._find({
        showId,
      });

      const showReviews = [] as IShowReviewObject[];

      for (let i = 0; i < reviews.length; i += 1) {
        const user = await User._findOne({
          id: reviews[i].userId,
        });

        showReviews.push({
          ...reviews[i],
          private: user.private,
          username: user.username,
          imageUrl: user.imageUrl,
        } as IShowReviewObject);
      }

      return showReviews;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}
