// Packages
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Fetcher for environmental variables.
 */
export class Environment {
  /**
   * Retrieves the server port.
   *
   * @returns {string} The server port.
   */
  static getPort(): number {
    return parseInt(process.env.PORT) || 3050;
  }

  /**
   * Retrieves the current environment.
   *
   * @returns {string} The current environment.
   */
  static getEnvironment(): string {
    return process.env.ENVIRONMENT;
  }

  /**
   * Retrieves database host from environmental variables.
   *
   * @returns {string} Database host.
   */
  static getDatabaseHost(): string {
    return process.env.DATABASE_HOST;
  }

  /**
   * Retrieves database user from environmental variables.
   *
   * @returns {string} Database user.
   */
  static getDatabaseUser(): string {
    return process.env.DATABASE_USER;
  }

  /**
   * Retrieves database password from environmental variables.
   *
   * @returns {string} Database password.
   */
  static getDatabasePassword(): string {
    return process.env.DATABASE_PASSWORD;
  }

  /**
   * Retrieves API key for The Movie DB.
   *
   * @returns {string} API key.
   */
  static getTheMovieDBAPIKey(): string {
    return process.env.THE_MOVIE_DB_API_KEY;
  }

  /**
   * Retrieves server secret.
   *
   * @returns {string} Server secret.
   */
  static getSecret(): string {
    return process.env.SECRET;
  }

  static getOrigin(): string {
    if (process.env.ENVIRONMENT === 'production') {
      return 'http://localhost:8080';
    }
    return 'http://localhost:8080';
  }
}
