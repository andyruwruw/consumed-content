// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import {
  attatchCookie,
  generateToken,
} from '../helpers/cookie-helpers';
import { comparePassword } from '../helpers/auth-helpers';
import { Handler } from './handler';

// Types
import { IUser } from '../../../shared/types';

/**
 * Handler for logging a user in.
 */
export class LoginHandler extends Handler {
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

      const username = req.query.username as string;
      const password = req.query.password as string;

      const user = await this._database.user.findOne({
        username,
      }) as IUser | null;

      if (!user) {
        res.status(400).send({
          error: 'Username not found.',
        });
        return;
      }

      const passwordsMatch = await comparePassword(
        user['password'] as string,
        password,
      );

      if (!passwordsMatch) {
        res.status(400).send({
          error: 'Username or password don\'t match.',
        });
        return;
      }

      const token = generateToken({
        userId: user['id'] || -1,
      });

      const completed = await this._database.userToken.insert({
        userId: user['id'] || -1,
        token,
      });

      if (!completed) {
        res.status(500).send({
          error: 'Internal Server Error',
        });
        return;
      }

      attatchCookie(
        res,
        token,
      );

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
