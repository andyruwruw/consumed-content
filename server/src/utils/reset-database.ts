// Local Imports
import { getDatabase } from '../database';
import { ConnectionManager } from '../database/sql-database/connection-manager';

/**
 * Setups Database by creating tables.
 */
const resetDatabase = async (): Promise<void> => {
  console.log('Resetting the database.');
  console.log('This process will delete any existing data and recreate tables.');

  console.log(' ');

  console.log('Connecting to the database.');

  const database = await getDatabase();
  await database.connect();

  console.log(' - Connected successfully.');

  console.log(' ');

  console.log('Dropping old database.');

  await ConnectionManager.connection.query('DROP DATABASE IF EXISTS consumedcontent;');
  
  console.log(' - Old database dropped.');

  console.log(' ');

  console.log('Setting up new database.');

  await ConnectionManager.connection.query('CREATE DATABASE IF NOT EXISTS consumedcontent');

  await ConnectionManager.connection.query('USE consumedcontent');

  console.log(' - New database created.');

  console.log(' ');

  console.log('Creating base tables.');
 
  await Promise.all([
    database.genre.createTable(),
    database.platform.createTable(),
    database.show.createTable(),
    database.user.createTable(),
  ]);

  console.log(' - Genre table created.');
  console.log(' - Platform table created.');
  console.log(' - Shows table created.');
  console.log(' - Users table created.');

  console.log('Creating dependent tables.');
 
  await Promise.all([
    database.category.createTable(),
    database.review.createTable(),
    database.showGenre.createTable(),
    database.showPlatform.createTable(),
    database.userFollow.createTable(),
    database.userShow.createTable(),
    database.userToken.createTable(),
  ]);

  console.log(' - Category table created.');
  console.log(' - Review table created.');
  console.log(' - ShowGenre table created.');
  console.log(' - ShowPlatform table created.');
  console.log(' - UserFollow table created.');
  console.log(' - UserShow table created.');
  console.log(' - UserToken table created.');

  console.log('Creating dependent tier 3 tables.');
 
  await database.categoryShow.createTable();

  console.log(' - CategoryShow table created.');

  console.log(' ');

  console.log('All tables created.');
  console.log('Database is clean and ready for use!');
};

resetDatabase();
