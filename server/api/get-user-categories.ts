// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { GetUserCategoriesHandler } from '../src/handlers';
import { handleCors } from '../src/helpers/cors';

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
  handleCors(
    req,
    res,
  );
  return GetUserCategoriesHandler.execute(
    req,
    res,
  );
}
