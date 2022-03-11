// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import {
  Request,
  Response,
} from 'express';
import {
  IPublicUserObject,
  IUser,
} from '../../../shared/types';

/**
 * Handler for editing users.
 */
export class EditUserHandler extends Handler {
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

      const name = req.query.name as string;
      const imageUrl = req.query.name as string || '';
      const privateMode = (req.query.private as string) === 'true';

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

      const existing = await this._database.user.getMe(
        user.id,
      ) as IUser;

      if (existing === null) {
        res.status(401).send({
          error: 'The user does not exist!',
        });
        return;
      }

      const completed = await this._database.user.update(
        user.id,
        name,
        user.username,
        existing.password,
        privateMode,
        imageUrl,
      );

      if (!completed) {
        res.status(500).send({
          error: 'Internal Server Error',
        });
        return;
      }

      const newUser = await this._database.user.getUser(
        user.id,
      ) as IPublicUserObject;

      res.status(200).send({
        user: newUser,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
