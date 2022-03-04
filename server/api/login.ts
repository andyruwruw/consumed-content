// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { LoginHandler } from '../src/handlers';
import { handleCors } from '../src/helpers/cors';

/**
 * Log a user in.
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
  return LoginHandler.execute(
    req,
    res,
  );
}
