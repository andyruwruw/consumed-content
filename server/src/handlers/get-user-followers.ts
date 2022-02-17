// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';

// Types
import { IUserFollow } from '../../../shared/types';

/**
 * Handler for getting the people following a user.
 */
export class GetUserFollowersHandler extends Handler {
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

      const follows = await this._database.userFollow.find({
        followingUserId: userId,
      }) as IUserFollow[];

      const users = [];

      for (let i = 0; i < follows.length; i += 1) {
        const follow = follows[i];

        const user = await this._database.user.findOne({
          id: follow.userId,
        });

        if (user) {
          users.push(user);
        }
      }

      res.status(200).send({
        users,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
