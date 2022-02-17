// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';
import { validate } from '../helpers/auth-helpers';

// Local Imports
import { Handler } from './handler';

// Types
import { IQueryUpdate } from '../types';
import { IReview } from '../../../shared/types';

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
    req: VercelRequest,
    res: VercelResponse,
  ): Promise<void> {
    try {
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

      const existing = await this._database.review.findOne({
        id,
      }) as IReview;

      if (!existing) {
        res.status(401).send({
          error: 'The review does not exist!',
        });
        return;
      }

      const update = {} as IQueryUpdate;

      if ('name' in existing && existing['name'] !== name) {
        update.name = name;
      }

      if ('rating' in existing && existing['rating'] !== rating) {
        update.rating = rating;
      }

      if ('description' in existing && existing['description'] !== description) {
        update.description = description;
      }

      const completed = await this._database.review.update({
        id,
      }, update);

      if (!completed) {
        res.status(500).send({
          error: 'Internal Server Error',
        });
        return;
      }

      const review = await this._database.review.findOne({
        id,
      }) as IReview;

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
