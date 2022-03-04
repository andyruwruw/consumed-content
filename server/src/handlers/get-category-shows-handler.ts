// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import {
  ICategory,
  IPublicUserObject,
} from '../../../shared/types';

/**
 * Handler for getting a category's shows.
 */
export class GetCategoryShowsHandler extends Handler {
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

      const id = parseInt(req.query.id as string, 10);

      if (!(typeof(id) === 'number')) {
        res.status(400).send({
          error: 'Category Id not set.',
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
      ) as ICategory;

      if (!existing) {
        res.status(400).send({
          error: 'Category does not exist.',
        });
        return;
      }

      const owner = await this._database.user.getUser(
        existing.userId,
      ) as IPublicUserObject;

      if (owner.private && owner.id !== user.id) {
        res.status(400).send({
          error: 'Owner has profile set to private.',
        });
        return;
      }

      const shows = await this._database.categoryShow.selectCategoryShows(
        id,
      );

      res.status(200).send({
        shows,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}