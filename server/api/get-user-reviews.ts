// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { GetUserReviewsHandler } from '../src/handlers';
import { handleCors } from '../src/helpers/cors';

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
  handleCors(
    req,
    res,
  );
  return GetUserReviewsHandler.execute(
    req,
    res,
  );
}
