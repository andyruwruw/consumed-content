// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import {
  Request,
  Response,
} from 'express';
import { ICategory, ICategoryShowObject } from '../../../shared/types';

/**
 * Handler for removing shows from a user's list.
 */
export class RemoveShowFromCategoryHandler extends Handler {
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
      const showId = parseInt(req.query.showId as string, 10);

      if (!(typeof(id) === 'number')) {
        res.status(400).send({
          error: 'Category ID not set.',
        });
        return;
      }

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

      const existing = await this._database.categoryShow.selectCategoryShows(
        id,
      ) as ICategoryShowObject[];

      if (existing.map(categoryShow => categoryShow.showId).includes(showId)) {
        res.status(204).send({
          completed: true,
        });
        return;
      }

      const completed = await this._database.categoryShow.remove(
        id,
        showId,
      ) !== 0;

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
