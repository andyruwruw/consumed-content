// Local Imports
import { Database } from '../database/database';
import { getDatabase } from '../database';
import { UsedAbstractHandlerError } from '../errors/used-abstract-handler-error';

// Types
import {
  Request,
  Response,
} from 'express';

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
  }

  /**
   * Executes the handler.
   *
   * @param {VercelRequest | Request} req Request for handler.
   * @param {VercelResponse | Response} res Response to request.
   */
  execute(
    req: Request,
    res: Response,
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
