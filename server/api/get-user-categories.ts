// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { GetUserCategoriesHandler } from '../server/src/handlers';

/**
 * Get a user's categories.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  return await GetUserCategoriesHandler.execute(
    req,
    res,
  );
}
