// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { CheckUserHandler } from '../server/src/handlers';

/**
 * Adds a show to a user's list.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  return await CheckUserHandler.execute(
    req,
    res,
  );
}
