// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { FollowHandler } from '../src/handlers';
import { handleCors } from '../src/helpers/cors';

/**
 * Follows another user.
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
  return FollowHandler.execute(
    req,
    res,
  );
}
