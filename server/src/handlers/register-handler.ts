// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';
import { hashPassword } from '../helpers/auth-helpers';
import { attatchCookie, generateToken } from '../helpers/cookie-helpers';

// Local Imports
import { Handler } from './handler';

export class RegisterHandler extends Handler {
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
      const name = req.query.name as string;
      const username = req.query.username as string;
      const password = req.query.password as string;

      // Check if exists

      const hashedPassword = await hashPassword(password);

      await this._database.user.insert({
        name,
        username,
        password: hashedPassword,
        private: true,
        imageUrl: '',
      });

      // Retrieve made row and send back.
      const user = {};

      const token = generateToken({
        userId: 1,
      });

      await this._database.userToken.insert({
        userId: 1,
        token,
      });

      attatchCookie(
        res,
        token,
      );

      res.status(201).send(user);
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
