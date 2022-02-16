// Packages
import { Connection } from 'mariadb';

// Local Imports
import { UsedAbstractDAOError } from '../../../errors/used-abstract-dao-error';

/**
 * Abstract Data Access Object, use concrete implementations.
 */
export class DataAccessObject<T> {
  /**
   * Creates the table if not already made.
   *
   * @param {Connection} connection MariaDB connection.
   * @returns {Promise<void>} Promise of action.
   */
  async createTable(connection: Connection): Promise<void> {
    return connection.query(this._getCreateTableQuery());
  }

  /**
   * Inserts a new item into the database.
   *
   * @param {Connection} connection MariaDB connection.
   * @param {T} item Item to insert. 
   * @returns {Promise<void>} Promise of action.
   */
  async insert(
    connection: Connection,
    item: T,
  ): Promise<void> {
    return connection.query(
      this._getCreateTableQuery(),
      item,
    );
  }

  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    throw new UsedAbstractDAOError();
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getInsertQuery(): string {
    throw new UsedAbstractDAOError();
  }
}
