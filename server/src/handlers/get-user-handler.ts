// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import { IUser } from '../../../shared/types';

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

      const user = await this._database.user.findOne({
        id: userId,
      }) as IUser;

      if (!user) {
        res.status(400).send({
          error: 'User not found.',
        });
        return;
      }

      let restricted = false;

      if (user.private) {
        const currentUser = await validate(
          req,
          this._database,
        );

        if (user.id !== currentUser.id) {
          restricted = true;
        }
      }

      if (!restricted) {
        res.status(200).send({
          user,
        });
        return;
      } else {
        res.status(200).send({
          username: user.username,
          private: true,
          imageUrl: user.imageUrl,
        });
        return;
      }
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
