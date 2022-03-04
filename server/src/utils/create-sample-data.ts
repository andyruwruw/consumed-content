// Local Imports
import { getDatabase } from '../database';
import { Database } from '../database/database';
import { NAMES } from '../assets/data/names';
import { ConnectionManager } from '../database/sql-database/connection-manager';
import { PLATFORMS } from '../assets/data/platforms';
import { IPublicUserObject } from '../../../shared/types';
import { generateToken } from '../helpers/cookie-helpers';

class SampleDataCreator {
  _database: Database;

  _userNum: number;

  _userCategoryNum: number;

  _userReviewNum: number;

  _userFollowNum: number;

  _userShowNum: number;

  _userTokenNum: number;

  _categoryShowNum: number;

  _users: number[];

  constructor() {
    this._users = [];
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
    const usernames = [] as string[];

    for (let i = 0; i < this._userNum; i += 1) {
      const name = `${this._getRandomName()} ${this._getRandomName()}`;
      const username = `${this._getRandomName()}${this._getRandomName()}${Math.floor(Math.random() * 20)}`;

      pending.push(this._database.user.register(
        name,
        username,
        '12345',
        Math.random() > .8,
        Math.random() > .5 ? 'https://random.imagecdn.app/v1/image?width=500&height=500' : 'https://picsum.photos/500',
      ));
      usernames.push(username);

      console.log(` - Creating ${name}`);
    }

    await Promise.all(pending);

    console.log(` - Done Creating Users.`);
    console.log(` - Retrieving for futher processing.`);

    const usersPending = [] as Promise<IPublicUserObject>[];

    for (let i = 0; i < usernames.length; i += 1) {
      usersPending.push(this._database.user.getUserByUsername(usernames[i]));
    }

    const users = await Promise.all(usersPending);

    this._users = users.map((user) => user.id);

    console.log(` - All created users retreived.`);

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

    const pending = [] as Promise<number>[];

    for (let i = 0; i < this._users.length; i += 1) {
      const followingNum = Math.floor(Math.random() * this._userFollowNum);

      let followIds = [] as number[];

      for (let j = 0; j < followingNum; j += 1) {
        let followingIdIndex = Math.floor(Math.random() * this._users.length);

        if (!(followIds.includes(this._users[followingIdIndex])) && followingIdIndex !== i) {
          followIds.push(this._users[followingIdIndex]);

          pending.push(this._database.userFollow.follow(
            this._users[i],
            this._users[followingIdIndex],
          ));

          console.log(` - ${this._users[i]} now follows ${this._users[followingIdIndex]}.`);
        }
      }
    }

    await Promise.all(pending);

    console.log(` - Done Creating User Follows.`);

    this._spacing();
  }
  
  async _createFakeUserShows(): Promise<void> {
    console.log(`Creating at max ${this._userShowNum} fake added shows per user.`);
  }
  
  async _createFakeUserTokens(): Promise<void> {
    console.log(`Creating at max ${this._userTokenNum} fake tokens per user.`);

    const pending = [] as Promise<number>[];

    for (let i = 0; i < this._users.length; i += 1) {
      const tokenNum = Math.floor(Math.random() * this._userTokenNum);

      console.log(` - User ${this._users[i]} has ${tokenNum} tokens.`);

      for (let j = 0; j < this._userTokenNum; j += 1) {
        const token = generateToken({
          id: this._users[i],
          date: (new Date()).getTime(),
        });
  
        pending.push(this._database.userToken.register(
          this._users[i],
          token,
        ));
      }
    }

    await Promise.all(pending);

    console.log(` - Done Creating User Tokens.`);

    this._spacing();
  }
  
  async _createFakeCategoryShows(): Promise<void> {
    console.log(`Creating at max ${this._categoryShowNum} fake shows per category.`);
  }
}

const dataCreator = new SampleDataCreator();
dataCreator.start();
