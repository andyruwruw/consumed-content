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
  Request,
  Response,
} from 'express';
import {
  IReview,
  IUser,
} from '../../../shared/types';

/**
 * Handler for fetching a set of reviews for a user.
 */
export class GetUserReviewsHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {VercelRequest} req Request for handler.
   * @param {VercelResponse} res Response to request.
   */
  async execute(
    req: VercelRequest | Request,
    res: VercelResponse | Response,
  ): Promise<void> {
    try {
      await this._connectDatabase();

      const id = parseInt(req.query.id as string, 10);

      if (!(typeof(id) === 'number')) {
        res.status(400).send({
          error: 'User ID not set.',
        });
        return;
      }

      const user = await validate(
        req,
        this._database,
      );

      const reviews = await this._database.review.getUserReviews(id);

      if ((!user || user.id !== id) && reviews[0].private) {
        res.status(401).send({
          error: 'User is private.',
        });
        return;
      }

      res.status(200).send({
        reviews,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
