// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { CheckUserHandler } from '../server/src/handlers';

/**
 * Check if a user is already logged in.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
  return await CheckUserHandler.execute(req, res);
}
