// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { GetUserShowsHandler } from '../server/src/handlers';

/**
 * Get a user's shows.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
  return await GetUserShowsHandler.execute(req, res);
}
