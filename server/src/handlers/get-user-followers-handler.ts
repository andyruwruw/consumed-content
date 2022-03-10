// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';

// Types
import {
  Request,
  Response,
} from 'express';
import { IUserFollowObject } from '../../../shared/types';

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

      const users = await this._database.userFollow.getFollowers(
        id,
      ) as IUserFollowObject[];

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
