// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

/**
 * Handler for checking if a new user is already logged in.
 */
export class CheckUserHandler extends Handler {
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
      const user = await validate(
        req,
        this._database,
      );

      if (!user) {
        res.status(204).send({});
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
