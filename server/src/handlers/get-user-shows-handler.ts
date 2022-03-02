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
  IShow,
  IUser,
} from '../../../shared/types';

/**
 * Handler for getting a user's shows.
 */
export class GetUserShowsHandler extends Handler {
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

      const shows = (await this._database.show.find({
        userId,
      })) as IShow[];

      res.status(200).send({
        shows,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
