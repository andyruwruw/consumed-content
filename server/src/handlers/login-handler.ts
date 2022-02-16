// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';
import { comparePassword } from '../helpers/auth-helpers';
import { attatchCookie, generateToken } from '../helpers/cookie-helpers';

// Local Imports
import { Handler } from './handler';

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
      const username = req.query.username as string;
      const password = req.query.password as string;

      const user = await this._database.user.find({
        username,
      });

      if (!user.length) {
        res.status(400).send({
          error: 'Username not found.',
        });
      }

      const passwordsMatch = await comparePassword(
        user[0]['password'] as string,
        password,
      );

      if (!passwordsMatch) {
        res.status(400).send({
          error: 'Username or password don\'t match.',
        });
      }

      const token = generateToken({
        userId: user['id'] || 'no-id',
      });

      await this._database.userToken.insert({
        userId: user['id'] || 'no-id',
        token,
      });

      attatchCookie(
        res,
        token,
      );

      res.status(200).send(user);
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
