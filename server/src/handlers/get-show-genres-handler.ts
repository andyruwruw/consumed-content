// Local Imports
import { Handler } from './handler';

// Types
import {
  Request,
  Response,
} from 'express';

/**
 * Handler for getting a list of shows.
 */
export class GetShowGenresHandler extends Handler {
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
          error: 'Show ID not set.',
        });
        return;
      }

      const genres = await this._database.showGenre.getShowGenres(id);

      res.status(200).send({
        genres,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
