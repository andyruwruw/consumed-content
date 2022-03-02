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
    req: VercelRequest,
    res: VercelResponse,
  ): Promise<void> {
    try {
      await this._connectDatabase();

      const userId = parseInt(req.query.userId as string, 10);

      if (!(typeof(userId) === 'number')) {
        res.status(400).send({
          error: 'User ID not set.',
        });
        return;
      }

      const user = await validate(
        req,
        this._database,
      );

      if (!user || user.id !== userId) {
        const requestedUser = await this._database.user.findOne({
          id: userId,
        }) as IUser;

        if (requestedUser.private) {
          res.status(401).send({
            error: 'User is private.',
          });
          return;
        }
      }

      const reviews = (await this._database.review.find({
        userId,
      })) as IReview[];

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
