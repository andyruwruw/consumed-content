// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import {
  Request,
  Response,
} from 'express';

/**
 * Handler for adding shows to a user's list.
 */
export class AddShowHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {Request} req Request for handler.
   * @param {Response} res Response to request.
   */
  async execute(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      await this._connectDatabase();

      const id = parseInt(req.query.id as string, 10);

      if (!(typeof(id) === 'number')) {
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

      if (await this._database.userShow.isShowAdded(
        user.id,
        id,
      )) {
        res.status(204).send({
          completed: true,
        });
        return;
      }

      const completed = (await this._database.userShow.add(
        user.id,
        id,
      ) !== 0);

      if (!completed) {
        res.status(500).send({
          error: 'Internal Server Error',
        });
        return;
      }

      res.status(201).send({
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
