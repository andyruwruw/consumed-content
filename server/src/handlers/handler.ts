// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import { Database } from '../database/database';
import { getDatabase } from '../database';
import { UsedAbstractHandlerError } from '../errors/used-abstract-handler-error';

/**
 * Abstract handler class.
 */
export class Handler {
  /**
   * Database instance.
   */
  _database: Database;

  /**
   * Whether the handler is ready to execute.
   */
  _ready: boolean;

  /**
   * Instantiates a new handler.
   */
  constructor() {
    this._database = getDatabase();
    this._connectDatabase();
  }

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
    throw new UsedAbstractHandlerError();
  }

  /**
   * Connects to the database.
   */
  async _connectDatabase(): Promise<void> {
    await this._database.connect();

    this._ready = true;
  }
}
