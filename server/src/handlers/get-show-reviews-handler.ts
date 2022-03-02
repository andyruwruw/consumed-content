// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import {
  IReview,
  IUser,
} from '../../../shared/types';

/**
 * Handler for fetching a set of reviews for a show.
 */
export class GetShowReviewsHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {VercelRequest} req Request for handler.
   * @param {VercelResponse} res Response to request.
   */
  async execute(
    req: VercelRequest,
    res: VercelResponse,
  ): Promise<void> {
    try {
      await this._connectDatabase();

      const showId = parseInt(req.query.showId as string, 10);

      if (!(typeof(showId) === 'number')) {
        res.status(400).send({
          error: 'Show ID not set.',
        });
        return;
      }

      const user = await validate(
        req,
        this._database,
      );

      const reviews = (await this._database.review.find({
        showId,
      })) as IReview[];

      const filteredReviews = [];
      let averageRating = 0;

      for (let i = 0; i < reviews.length; i += 1) {
        averageRating += reviews[i].rating;

        const writingUser = await this._database.user.findOne({
          id: reviews[i].userId,
        }) as IUser;

        if (!writingUser.private || writingUser.id === user.id) {
          filteredReviews.push(reviews[i]);
        }
      }

      averageRating /= reviews.length;

      res.status(200).send({
        reviews,
        averageRating,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
