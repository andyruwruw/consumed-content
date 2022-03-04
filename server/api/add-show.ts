// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { CheckUserHandler } from '../src/handlers';
import { handleCors } from '../src/helpers/cors';

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
  handleCors(
    req,
    res,
  );
  return CheckUserHandler.execute(
    req,
    res,
  );
}
