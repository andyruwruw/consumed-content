// Packages
import { Connection } from 'mariadb';

export class ConnectionManager {
  /**
   * Static reference to connection.
   */
  static connection: Connection = null;

  /**
   * Sets static reference to connection.
   *
   * @param {Connection} connection Static reference to connection.
   */
  static setConnection(connection: Connection): void {
    ConnectionManager.connection = connection;
  }
}
