// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { CreateReviewHandler } from '../src/handlers';
import { handleCors } from '../src/helpers/cors';

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
  handleCors(
    req,
    res,
  );
  return CreateReviewHandler.execute(
    req,
    res,
  );
}
