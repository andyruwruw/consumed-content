// Local Imports
import { Handler } from './handler';

// Types
import {
  Request,
  Response,
} from 'express';
import { ICategory } from '../../../shared/types';
import { validate } from '../helpers/auth-helpers';

/**
 * Handler for getting a user's categories.
 */
export class GetUserCategoriesHandler extends Handler {
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
          error: 'User ID not set.',
        });
        return;
      }

      const user = await validate(
        req,
        this._database,
      );

      const categories = (await this._database.category.selectUserCategories(
        id,
      )) as ICategory[];

      if ((!user || user.id !== id) && categories[0].private) {
        res.status(401).send({
          error: 'This account is private.',
        });
        return;
      }

      res.status(200).send({
        categories,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
