// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { SearchTvShowsHandler } from '../server/src/handlers';

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
  return await SearchTvShowsHandler.execute(
    req,
    res,
  );
}
