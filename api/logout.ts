// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { LogoutHandler } from '../server/src/handlers';

/**
 * Logout a user.
 *
 * @param {VercelRequest} req Request for login URL.
 * @param {VercelResponse} res Response to request.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  return await LogoutHandler.execute(
    req,
    res,
  );
}
