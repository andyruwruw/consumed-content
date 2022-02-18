// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';
import { validate } from '../helpers/auth-helpers';

// Local Imports
import { Handler } from './handler';

// Types
import {
  ICategory,
  IUser,
} from '../../../shared/types';

/**
 * Handler for getting a user's categories.
 */
export class GetUserCategoriesHandler extends Handler {
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

      const categories = (await this._database.category.find({
        userId,
      })) as ICategory[];

      res.status(200).send({
        categories,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}