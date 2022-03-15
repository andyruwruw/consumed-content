// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import {
  Request,
  Response,
} from 'express';

/**
 * Handler for creating reviews.
 */
export class CreateCategoryHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {VercelRequest} req Request for handler.
   * @param {VercelResponse} res Response to request.
   */
  async execute(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      await this._connectDatabase();

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

      const completed = (await this._database.category.create(
        user.id,
        'New Category',
        '',
      ) !== 0);

      console.log(completed);

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
