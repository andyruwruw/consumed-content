// Local Imports
import { ConnectionManager } from '../connection-manager';
import { UsedAbstractDAOError } from '../../../errors/used-abstract-dao-error';

/**
 * Abstract Data Access Object, use concrete implementations.
 */
export class DataAccessObject<T> {
  /**
   * Properties of T.
   */
  _keys: string[];

  /**
   * Creates the table if not already made.
   *
   * @returns {Promise<void>} Promise of action.
   */
  async createTable(): Promise<void> {
    if (ConnectionManager.connection) {
      return ConnectionManager.connection.query(this._getCreateTableQuery());
    }
  }

  /**
   * Drops a table.
   *
   * @returns {Promise<void>} Promise of action.
   */
  async dropTable(): Promise<void> {
    if (ConnectionManager.connection) {
      return ConnectionManager.connection.query(this._getDropTableQuery());
    }
  }

  /**
   * Deletes all rows.
   *
   * @returns {Promise<void>} Promise of action.
   */
  async deleteAll(): Promise<void> {
    if (ConnectionManager.connection) {
      return ConnectionManager.connection.query(this._getDeleteAllQuery());
    }
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
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for drop table.
   */
  _getDropTableQuery(): string {
    throw new UsedAbstractDAOError();
  }

  /**
   * Retrieves delete all rows query for object.
   * 
   * @returns {string} SQL query for deleting all rows.
   */
  _getDeleteAllQuery(): string {
    throw new UsedAbstractDAOError();
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getTableName(): string {
    throw new UsedAbstractDAOError();
  }
}
