// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

export class CheckUserHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {VercelRequest} req Request for handler.
   * @param {VercelResponse} res Response to request.
   */
  execute(
    req: VercelRequest,
    res: VercelResponse,
  ): void {
    try {
      const user = validate(
        req,
        this._database,
      );

      if (!user) {
        res.status(204).send({});
      }

      res.status(200).send(user);
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
