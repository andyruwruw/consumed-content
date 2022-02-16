// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { GetReviewsHandler } from '../server/src/handlers';

/**
 * Get a set of reviews.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  return await GetReviewsHandler.execute(
    req,
    res,
  );
}
