// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { CreateReviewHandler } from '../server/src/handlers';

/**
 * Creates a new review.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  return await CreateReviewHandler.execute(
    req,
    res,
  );
}
