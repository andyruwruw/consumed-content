// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { SearchTvShowsHandler } from '../src/handlers';
import { handleCors } from '../src/helpers/cors';

/**
 * Searches for TV shows.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  handleCors(
    req,
    res,
  );
  return SearchTvShowsHandler.execute(
    req,
    res,
  );
}
