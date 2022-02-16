// Local Imports
import { Database } from './database';
import { CacheDatabase } from './cache-database';
import { SQLDatabase } from './sql-database';
import { Environment } from '../helpers/environment';

// Instances
const SQLDatabaseInstance = new SQLDatabase();
const CacheDatabaseInstance = new CacheDatabase();

/**
 * Generates the appropriate database based on the environment.
 *
 * @returns {Database} A concrete database implementation.
 */
export const getDatabase = (): Database => {
  if (Environment.getEnvironment() === 'production') {
    return SQLDatabaseInstance;
  }
  return CacheDatabaseInstance;
};
