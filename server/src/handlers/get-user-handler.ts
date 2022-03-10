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
import { IPublicUserObject } from '../../../shared/types';

/**
 * Handler for getting a user's info.
 */
export class GetUserHandler extends Handler {
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

      const user = await this._database.user.getUser(
        id,
      ) as IPublicUserObject;

      if (!user) {
        res.status(400).send({
          error: 'User not found.',
        });
        return;
      }

      res.status(200).send({
        user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
