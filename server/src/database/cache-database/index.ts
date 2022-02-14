// Local Imports
import { Database } from '../database';

/**
 * Concrete Database implementation for SQL Database.
 */
export class CacheDatabase extends Database {
  /**
   * Whether the database instance is connected.
   *
   * @returns {boolean} Whether the database instance is connected.
   */
   isConnected(): boolean {
    return true;
  }
}
