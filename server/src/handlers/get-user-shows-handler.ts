// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';
import { validate } from '../helpers/auth-helpers';

// Types
import { IUserShowObject } from '../../../shared/types';

/**
 * Handler for getting a user's shows.
 */
export class GetUserShowsHandler extends Handler {
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
      const type = req.query.type as string || '';

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

      const userInQuestion = await this._database.user.getUser(id);

      if (userInQuestion.private && user.id !== id) {
        res.status(401).send({
          error: 'User is private.',
        });
        return;
      }

      let shows;

      if (type === 'movie') {
        shows = (await this._database.userShow.getUserMovies(id)) as IUserShowObject[];
      } else if (type === 'tv-show') {
        shows = (await this._database.userShow.getUserTvShows(id)) as IUserShowObject[];
      } else {
        shows = (await this._database.userShow.getUserShows(id)) as IUserShowObject[];
      }

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
