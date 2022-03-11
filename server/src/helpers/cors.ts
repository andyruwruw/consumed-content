// Packages
import {
  Request,
  Response,
} from 'express';

// Local Imports
import { Environment } from './environment';

/**
 * Does cors stuff.
 * @param {Request} req Incoming request.
 * @param {Response} res Outgoing response.
 */
export const handleCors = (
  req: Request,
  res: Response,
): void => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    Environment.getOrigin(),
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
}
