// Local Imports
import { getDatabase } from '../database';

/**
 * Inserts fake data.
 */
const createSampleData = async (): Promise<void> => {
  console.log('Creating sample data.');

  const database = await getDatabase();
  await database.connect();

  console.log(process.argv);
};

const createFakeGenres = async (): Promise<void> => {
  
}

const createFakePlatforms = async (): Promise<void> => {
  
}

const createFakeShows = async (): Promise<void> => {
  
}

const createFakeUsers = async (): Promise<void> => {

}

const createFakeCategories = async (): Promise<void> => {

}

const createFakeReviews = async (): Promise<void> => {

}

const createFakeShowGenres = async (): Promise<void> => {

}

const createFakeShowPlatforms = async (): Promise<void> => {

}

const createFakeUserFollows = async (): Promise<void> => {

}

const createFakeUserShows = async (): Promise<void> => {

}

const createFakeUserTokens = async (): Promise<void> => {

}

const createFakeCategoryShows = async (): Promise<void> => {

}

createSampleData();
