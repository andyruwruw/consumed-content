// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { DeleteReviewHandler } from '../src/handlers';

/**
 * Deletes a review
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  return DeleteReviewHandler.execute(
    req,
    res,
  );
}
