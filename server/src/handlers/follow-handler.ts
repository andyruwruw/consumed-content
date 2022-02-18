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
 * Handler for following other users.
 */
export class FollowHandler extends Handler {
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

      const existing = await this._database.userFollow.findOne({
        userId: user['id'],
        followingUserId,
      }) as IUserFollow;

      if (existing) {
        res.status(401).send({
          error: 'Already following user.',
        });
        return;
      }

      const completed = (await this._database.userFollow.insert({
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