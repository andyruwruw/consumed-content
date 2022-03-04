// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { RemoveShowHandler } from '../src/handlers';

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
  return RemoveShowHandler.execute(
    req,
    res,
  );
}