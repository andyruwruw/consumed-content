// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { SearchMoviesHandler } from '../src/handlers';
import { handleCors } from '../src/helpers/cors';

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
  handleCors(
    req,
    res,
  );
  return SearchMoviesHandler.execute(
    req,
    res,
  );
}
