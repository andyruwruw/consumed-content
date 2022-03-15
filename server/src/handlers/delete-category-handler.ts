// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import {
  Request,
  Response,
} from 'express';
import { ICategory, IUserReviewObject } from '../../../shared/types';

/**
 * Handler for deleting reviews
 */
export class DeleteCategoryHandler extends Handler {
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

      const id = parseInt(req.query.id as string, 10);

      if (!(typeof(id) === 'number')) {
        res.status(400).send({
          error: 'Category ID not set.',
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

      const existing = await this._database.category.select(
        id,
      ) as ICategory | null;

      if (existing === null) {
        res.status(401).send({
          error: 'Could not find category.',
        });
        return;
      }

      if (existing.userId !== user.id) {
        res.status(401).send({
          error: 'You don\'t have permission to delete that.',
        });
        return;
      }

      const completed = await this._database.category.delete(
        id,
      ) !== 0;

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