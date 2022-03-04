// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { GetUserHandler } from '../src/handlers';
import { handleCors } from '../src/helpers/cors';

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
  handleCors(
    req,
    res,
  );
  return GetUserHandler.execute(
    req,
    res,
  );
}
