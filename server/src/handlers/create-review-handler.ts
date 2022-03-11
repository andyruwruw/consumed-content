// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import {
  Request,
  Response,
} from 'express';
import { IUserReviewObject } from '../../../shared/types';

/**
 * Handler for creating reviews.
 */
export class CreateReviewHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {VercelRequest} req Request for handler.
   * @param {VercelResponse} res Response to request.
   */
  async execute(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      await this._connectDatabase();

      const showId = parseInt(req.query.showId as string, 10);
      const name = req.query.review as string || 'Review';
      const rating = parseInt(req.query.rating as string, 10) || 0;
      const description = req.query.description as string || '';

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

      if (!user) {
        res.status(401).send({
          error: 'Not logged in.',
        });
        return;
      }

      if (await this._database.review.getUserShowReview(
        user.id,
        showId,
      ) !== null) {
        res.status(401).send({
          error: 'Edit the existing review.',
        });
        return;
      }

      const completed = (await this._database.review.create(
        showId,
        user.id,
        name,
        rating,
        description,
      ) !== 0);

      if (!completed) {
        res.status(500).send({
          error: 'Internal Server Error',
        });
        return;
      }

      const review = await this._database.review.getUserShowReview(
        user.id,
        showId,
      ) as IUserReviewObject;

      res.status(201).send({
        review,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
