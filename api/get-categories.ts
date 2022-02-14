// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { GetCategoriesHandler } from '../server/src/handlers';

/**
 * Get a set of categories.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
  return await GetCategoriesHandler.execute(req, res);
}
