// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';
import { getCookie } from '../helpers/cookie-helpers';

/**
 * Handler for logging users out.
 */
export class LogoutHandler extends Handler {
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

      const user = validate(
        req,
        this._database,
      );

      if (!user) {
        res.status(204).send({});
        return;
      }

      const token = getCookie(req);

      if (!token) {
        res.status(204).send({});
        return;
      }

      const completed = await this._database.userToken.delete({
        userId: user.id,
        token,
      });

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
