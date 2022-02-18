// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import { IUserShow } from '../../../shared/types';

/**
 * Handler for removing shows from a user's list.
 */
export class RemoveShowHandler extends Handler {
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
      const showId = parseInt(req.query.showId as string, 10);

      if (!(typeof(showId) === 'number')) {
        res.status(400).send({
          error: 'Show ID not set.',
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

      const existing = await this._database.userShow.findOne({
        userId: user['id'],
        showId,
      }) as IUserShow | null;

      if (!existing) {
        res.status(204).send({
          completed: true,
        });
        return;
      }

      const completed = await this._database.userShow.delete({
        showId,
        userId: user['id'],
      }) !== 0;

      if (!completed) {
        res.status(500).send({
          error: 'Internal Server Error',
        });
        return;
      }

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