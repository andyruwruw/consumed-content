// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { GetUserCategoriesHandler } from '../src/handlers';

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
  return GetUserCategoriesHandler.execute(
    req,
    res,
  );
}
