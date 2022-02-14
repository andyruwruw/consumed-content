// Local Imports
import { UsedAbstractDatabaseError } from '../errors/used-abstract-database-error';

/**
 * Abstract Database class.
 */
export class Database {
  /**
   * Connects to the database.
   */
  async connect(): Promise<void> {
    throw new UsedAbstractDatabaseError();
  }

  /**
   * Whether the database instance is connected.
   *
   * @returns {boolean} Whether the database instance is connected.
   */
   isConnected(): boolean {
    return false;
  }
}
