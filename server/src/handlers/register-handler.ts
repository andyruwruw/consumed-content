// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';
import { hashPassword } from '../helpers/auth-helpers';
import { attatchCookie, generateToken } from '../helpers/cookie-helpers';

// Local Imports
import { Handler } from './handler';

// Types
import {
  Request,
  Response,
} from 'express';
import { IUser } from '../../../shared/types';

/**
 * Handler for registering a user.
 */
export class RegisterHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {VercelRequest} req Request for handler.
   * @param {VercelResponse} res Response to request.
   */
  async execute(
    req: VercelRequest | Request,
    res: VercelResponse | Response,
  ): Promise<void> {
    try {
      await this._connectDatabase();

      const name = req.query.name as string;
      const username = req.query.username as string;
      const password = req.query.password as string;

      if (!name
        || !name.length
        || !username
        || !username.length
        || !password
        || !password.length) {
        res.status(400).send({
          error: 'Required field not provided.',
        });
        return;
      }

      const existing = await this._database.user.getUserByUsername(username) as IUser;

      if (existing) {
        res.status(409).send({
          error: 'Username already exists.',
        });
        return;
      }

      const hashedPassword = await hashPassword(password);

      const completedUserInsert = await this._database.user.register(
        name,
        username,
        hashedPassword,
        true,
        '',
      ) !== 0;

      if (!completedUserInsert) {
        res.status(500).send({
          error: 'Internal Server Error',
        });
        return;
      }

      const user = await this._database.user.getUserByUsername(
        username,
      );

      const token = generateToken({
        id: user.id,
        date: (new Date()).getTime(),
      });

      const completedTokenInsert = await this._database.userToken.register(
        user.id,
        token,
      ) !== 0;

      if (!completedTokenInsert) {
        res.status(500).send({
          error: 'Internal Server Error',
        });
        return;
      }

      attatchCookie(
        res,
        token,
      );

      res.status(201).send({
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
