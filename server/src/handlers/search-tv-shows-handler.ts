// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { convertSimplifiedTvShows } from '../helpers/themoviedb-helpers';
import { Handler } from './handler';
import api from '../api';

export class SearchTvShowsHandler extends Handler {
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
      const query = req.query.query as string;
      const page = parseInt(req.query.page as string, 10) || 1;

      const response = await api.themoviedb.search.searchTvShows(
        query,
        page,
      );

      const shows = convertSimplifiedTvShows(response.results);

      res.status(200).send(shows);
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
