// Packages
import mariadb from 'mariadb';

// Local Imports
import { Database } from '../database';
import { Environment } from '../../helpers/environment';

/**
 * Concrete Database implementation for SQL Database.
 */
export class SQLDatabase extends Database {
  /**
   * Connection to database.
   */
   _connection: mariadb.Connection;

  /**
   * Connects to the database.
   */
  async connect(): Promise<void> {
    const pool = await mariadb.createPool({
      host: Environment.getDatabaseHost(),
      user: Environment.getDatabaseUser(),
      password: Environment.getDatabasePassword(),
      database: 'consumed-content',
    });

    this._connection = await pool.getConnection();
  }

  /**
   * Whether the database instance is connected.
   *
   * @returns {boolean} Whether the database instance is connected.
   */
  isConnected(): boolean {
    return this._connection !== undefined;
  }
}
