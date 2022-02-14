// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { EditReviewHandler } from '../server/src/handlers';

/**
 * Edits an existing review.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
  return await EditReviewHandler.execute(req, res);
}
