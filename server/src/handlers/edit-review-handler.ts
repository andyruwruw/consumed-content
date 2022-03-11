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
 * Handler for editing reviews.
 */
export class EditReviewHandler extends Handler {
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

      const id = parseInt(req.query.id as string, 10);
      const name = req.query.review as string || 'Review';
      const rating = parseInt(req.query.rating as string, 10) || 0;
      const description = req.query.description as string || '';

      if (!(typeof(id) === 'number')) {
        res.status(400).send({
          error: 'Review ID not set.',
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

      const existing = await this._database.review.getById(
        id,
      ) as IUserReviewObject;

      if (existing === null) {
        res.status(401).send({
          error: 'The review does not exist!',
        });
        return;
      }

      if (existing.userId !== user.id) {
        res.status(401).send({
          error: 'You don\'t have permission to edit that.',
        });
        return;
      }

      const completed = await this._database.review.update(
        id,
        name,
        rating,
        description,
      );

      if (!completed) {
        res.status(500).send({
          error: 'Internal Server Error',
        });
        return;
      }

      const review = await this._database.review.getById(
        id,
      ) as IUserReviewObject;

      res.status(200).send({
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
