// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { GetUserReviewsHandler } from '../server/src/handlers';

/**
 * Get a user's reviews.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  return await GetUserReviewsHandler.execute(
    req,
    res,
  );
}
