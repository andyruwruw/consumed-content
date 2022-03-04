// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { EditReviewHandler } from '../src/handlers';
import { handleCors } from '../src/helpers/cors';

/**
 * Edits an existing review.
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
  return EditReviewHandler.execute(
    req,
    res,
  );
}
