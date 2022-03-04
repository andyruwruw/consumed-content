// Local Imports
import { getDatabase } from '../database';
import { Database } from '../database/database';
import { NAMES } from '../assets/data/names';
import { ConnectionManager } from '../database/sql-database/connection-manager';
import { PLATFORMS } from '../assets/data/platforms';

class SampleDataCreator {
  _database: Database;

  _userNum: number;

  _userCategoryNum: number;

  _userReviewNum: number;

  _userFollowNum: number;

  _userShowNum: number;

  _userTokenNum: number;

  _categoryShowNum: number;

  constructor() {
    this._userNum = parseInt(process.argv[process.argv.indexOf('--users') + 1], 10) || 20;
    this._userCategoryNum = parseInt(process.argv[process.argv.indexOf('--user-categories') + 1], 10) || 5;
    this._userReviewNum = parseInt(process.argv[process.argv.indexOf('--user-reviews') + 1], 10) || 5;
    this._userFollowNum = parseInt(process.argv[process.argv.indexOf('--user-follows') + 1], 10) || 5;
    this._userShowNum = parseInt(process.argv[process.argv.indexOf('--user-shows') + 1], 10) || 20;
    this._userTokenNum = parseInt(process.argv[process.argv.indexOf('--user-tokens') + 1], 10) || 2;
    this._categoryShowNum = parseInt(process.argv[process.argv.indexOf('--category-shows') + 1], 10) || 5;
  }

  async start() {
    console.log('Creating sample data.');
    this._instructions();
    await this._connectToDatabase();

    // Base Tables
    await this._createFakeUsers();
    await this._createFakePlatforms();

    // Dependent Tables
    await this._createFakeUserTokens();
    await this._createFakeUserFollows();
    await this._createFakeUserShows();
    await this._createFakeCategories();
    await this._createFakeReviews();

    // Dependent Tier 3 Tables
    await this._createFakeCategoryShows();
    await this._createFakeShowPlatforms();
  }

  _spacing() {
    console.log(' ');
  }

  _instructions() {
    this._spacing();
    console.log('You can customize the number of items added using the following flags:');
    console.log('--users: Number of users. (Default: 20)');
    console.log('--user-categories: Max number of categories per user. (Default: 5)');
    console.log('--user-reviews: Max number of reviews per user. (Default: 5)');
    console.log('--user-follows: Max number of follows per user. (Default: 5)');
    console.log('--user-shows: Max number of shows per user. (Default: 20)');
    console.log('--user-tokens: Max number of tokens per user. (Default: 2)');
    console.log('--category-shows: Max number of shows per category. (Default: 5)');
    this._spacing();
    console.log('Example: npm run database:create-data -- --users 10');
    console.log('Note that the flags are prefixed by "--".');
    this._spacing();
  }

  async _connectToDatabase() {
    console.log('Connecting to the database.');
    this._database = await getDatabase();
    await this._database.connect();
    console.log(' - Connected successfully.');
    await ConnectionManager.connection.query('USE consumedcontent');
    this._spacing();
  }
  
  async _createFakePlatforms(): Promise<void> {
    console.log('Creating fake platforms.');

    const pending = [] as Promise<number>[];

    for (let i = 0; i < PLATFORMS.length; i += 1) {
      pending.push(this._database.platform.create(
        PLATFORMS[i].name,
        PLATFORMS[i].imageUrl,
        PLATFORMS[i].cost,
      ));

      console.log(` - Creating ${PLATFORMS[i].name}`);
    }

    await Promise.all(pending);

    console.log(` - Done Creating Platforms.`);

    this._spacing();
  }

  _getRandomName(): string {
    return NAMES[Math.floor(Math.random() * NAMES.length)];
  }
  
  async _createFakeUsers(): Promise<void> {
    console.log(`Creating ${this._userNum} fake users.`);

    const pending = [] as Promise<number>[];

    for (let i = 0; i < this._userNum; i += 1) {
      const name = `${this._getRandomName()} ${this._getRandomName()}`;

      pending.push(this._database.user.register(
        name,
        `${this._getRandomName()}${this._getRandomName()}${Math.floor(Math.random() * 20)}`,
        '12345',
        Math.random() > .8,
        Math.random() > .5 ? 'https://random.imagecdn.app/v1/image?width=500&height=500' : 'https://picsum.photos/500',
      ));

      console.log(` - Creating ${name}`);
    }

    await Promise.all(pending);

    console.log(` - Done Creating Users.`);

    this._spacing();
  }
  
  async _createFakeCategories(): Promise<void> {
    console.log(`Creating at max ${this._userCategoryNum} fake categories per user.`);
  }
  
  async _createFakeReviews(): Promise<void> {
    console.log(`Creating at max ${this._userReviewNum} fake reviews per user.`);
  }
  
  async _createFakeShowPlatforms(): Promise<void> {
    console.log(`Creating at max ${2} fake platforms per show.`);
  }
  
  async _createFakeUserFollows(): Promise<void> {
    console.log(`Creating at max ${this._userFollowNum} fake follows per user.`);
  }
  
  async _createFakeUserShows(): Promise<void> {
    console.log(`Creating at max ${this._userShowNum} fake added shows per user.`);
  }
  
  async _createFakeUserTokens(): Promise<void> {
    console.log(`Creating at max ${this._userTokenNum} fake tokens per user.`);
  }
  
  async _createFakeCategoryShows(): Promise<void> {
    console.log(`Creating at max ${this._categoryShowNum} fake shows per category.`);
  }
}

const dataCreator = new SampleDataCreator();
dataCreator.start();
