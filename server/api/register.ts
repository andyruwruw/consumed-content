// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { RegisterHandler } from '../src/handlers';
import { handleCors } from '../src/helpers/cors';

/**
 * Registers a user.
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
  return RegisterHandler.execute(
    req,
    res,
  );
}
