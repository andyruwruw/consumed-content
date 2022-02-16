// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { SearchMoviesHandler } from '../server/src/handlers';

/**
 * Searches for movies.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  return await SearchMoviesHandler.execute(
    req,
    res,
  );
}
