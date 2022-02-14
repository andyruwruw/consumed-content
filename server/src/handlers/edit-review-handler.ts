// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Handler } from './handler';

export class EditReviewHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {VercelRequest} req Request for handler.
   * @param {VercelResponse} res Response to request.
   */
  execute(
    req: VercelRequest,
    res: VercelResponse,
  ): void {
    
  }
}
