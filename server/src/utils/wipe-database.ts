// Local Imports
import { getDatabase } from '../database';
import { ConnectionManager } from '../database/sql-database/connection-manager';

/**
 * Wipes Database by deleting all rows.
 */
export const wipeDatabase = async (): Promise<void> => {
  console.log('Wipping the database.');
  console.log('This process will delete any existing data but leave tables as they are.');
  
  console.log(' ');

  console.log('Connecting to the database.');

  const database = await getDatabase();
  await database.connect();

  console.log(' - Connected successfully.');

  console.log(' ');

  await ConnectionManager.connection.query('USE consumedcontent');

  console.log('Deleting dependent tier 3 table entries.');

  await database.categoryShow.deleteAll();

  console.log(' - CategoryShow table wiped.');

  console.log(' ');

  console.log('Deleting dependent table entries.');

  await Promise.all([
    database.category.deleteAll(),
    database.review.deleteAll(),
    database.showGenre.deleteAll(),
    database.showPlatform.deleteAll(),
    database.userFollow.deleteAll(),
    database.userShow.deleteAll(),
    database.userToken.deleteAll(),
  ]);

  console.log(' - Category table wiped.');
  console.log(' - Review table wiped.');
  console.log(' - ShowGenre table wiped.');
  console.log(' - ShowPlatform table wiped.');
  console.log(' - UserFollow table wiped.');
  console.log(' - UserShow table wiped.');
  console.log(' - UserToken table wiped.');

  console.log(' ');

  console.log('Deleting base tables.');
 
  await Promise.all([
    database.genre.deleteAll(),
    database.platform.deleteAll(),
    database.show.deleteAll(),
    database.user.deleteAll(),
  ]);

  console.log(' - Genre table wiped.');
  console.log(' - Platform table wiped.');
  console.log(' - Shows table wiped.');
  console.log(' - Users table wiped.');

  console.log(' ');

  console.log('All tables wiped.');
  console.log('Database is clean and ready for use!');
};

wipeDatabase();
