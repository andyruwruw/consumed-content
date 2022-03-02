// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import { IUserFollow } from '../../../shared/types';

/**
 * Handler for unfollowing other users.
 */
export class UnfollowHandler extends Handler {
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

      const followingUserId = parseInt(req.query.followingUserId as string, 10);

      if (!(typeof(followingUserId) === 'number')) {
        res.status(400).send({
          error: 'User to follow not set.',
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

      const follow = await this._database.userFollow.findOne({
        userId: user['id'],
        followingUserId,
      }) as IUserFollow;

      if (!follow) {
        res.status(200).send({
          error: 'Not following user.',
        });
        return;
      }

      const completed = (await this._database.userFollow.delete({
        userId: user['id'],
        followingUserId,
      })) === 1;

      res.status(200).send({
        completed,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
