// Local Imports
import { Database } from './database';
import { CacheDatabase } from './cache-database';
import { SQLDatabase } from './sql-database';
import { Environment } from '../helpers/environment';

/**
 * Generates the appropriate database based on the environment.
 *
 * @returns {Database} A concrete database implementation.
 */
export const getDatabase = (): Database => {
  if (Environment.getEnvironment() === 'production') {
    return new SQLDatabase();
  }
  return new CacheDatabase();
};
