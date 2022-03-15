// Local Imports
import {
  convertSimplifiedMovies,
  convertSimplifiedTvShows,
} from '../helpers/themoviedb-helpers';
import { 
  REVIEW_NAMES,
  REVIEW_DESCRIPTIONS,
} from '../assets/data/reviews';
import { CATEGORY_NAMES } from '../assets/data/categories';
import { getDatabase } from '../database';
import { Database } from '../database/database';
import { NAMES } from '../assets/data/names';
import { ConnectionManager } from '../database/sql-database/connection-manager';
import { PLATFORMS } from '../assets/data/platforms';
import { generateToken } from '../helpers/cookie-helpers';
import { wipeDatabase } from './wipe-database';
import api from '../api';

// Types
import {
  IPublicUserObject,
  IShow,
} from '../../../shared/types';

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

  _shows: number[];

  _categories: number[];

  _indices: Record<string, number>;

  constructor() {
    this._users = [];
    this._shows = [];
    this._categories = [];
    this._userNum = parseInt(process.argv[process.argv.indexOf('--users') + 1], 10) || 20;
    this._userCategoryNum = parseInt(process.argv[process.argv.indexOf('--user-categories') + 1], 10) || 5;
    this._userReviewNum = parseInt(process.argv[process.argv.indexOf('--user-reviews') + 1], 10) || 5;
    this._userFollowNum = parseInt(process.argv[process.argv.indexOf('--user-follows') + 1], 10) || 5;
    this._userShowNum = parseInt(process.argv[process.argv.indexOf('--user-shows') + 1], 10) || 20;
    this._userTokenNum = parseInt(process.argv[process.argv.indexOf('--user-tokens') + 1], 10) || 2;
    this._categoryShowNum = parseInt(process.argv[process.argv.indexOf('--category-shows') + 1], 10) || 5;
    this._indices = {};
  }

  async start() {
    await wipeDatabase();
    console.log('Creating sample data.');
    this._instructions();
    await this._connectToDatabase();

    // Base Tables
    await this._database._addGenres();
    await this._createFakeUsers();
    await this._createFakePlatforms();

    // Dependent Tables
    await this._createFakeUserTokens();
    await this._createFakeUserFollows();
    await this._createFakeUserShows();
    await this._createFakeCategories();
    await this._createFakeReviews();

    // // Dependent Tier 3 Tables
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


      const images = [
        'https://random.imagecdn.app/v1/image?width=500&height=500',
        'https://picsum.photos/500',
        'https://random.imagecdn.app/v1/image?width=499&height=499',
        'https://picsum.photos/499',
        'https://random.imagecdn.app/v1/image?width=498&height=498',
        'https://picsum.photos/498',
        'https://random.imagecdn.app/v1/image?width=497&height=497',
        'https://picsum.photos/497',
        'https://random.imagecdn.app/v1/image?width=496&height=496',
        'https://picsum.photos/496',
        'https://random.imagecdn.app/v1/image?width=495&height=495',
        'https://picsum.photos/495',
        'https://random.imagecdn.app/v1/image?width=494&height=494',
        'https://picsum.photos/494',
        'https://random.imagecdn.app/v1/image?width=493&height=493',
        'https://picsum.photos/493',
        'https://random.imagecdn.app/v1/image?width=492&height=492',
        'https://picsum.photos/492',
        'https://random.imagecdn.app/v1/image?width=491&height=491',
        'https://picsum.photos/491',
        'https://random.imagecdn.app/v1/image?width=490&height=490',
        'https://picsum.photos/490',
        'https://random.imagecdn.app/v1/image?width=489&height=489',
        'https://picsum.photos/489',
        'https://random.imagecdn.app/v1/image?width=488&height=488',
        'https://picsum.photos/488',
        'https://random.imagecdn.app/v1/image?width=487&height=487',
        'https://picsum.photos/487',
      ];

      pending.push(this._database.user.register(
        name,
        username,
        '12345',
        Math.random() > .8,
        images[Math.floor(Math.random() * images.length)],
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

    const pending = [];

    for (let i = 0; i < this._users.length; i += 1) {
      const categoryNum = Math.floor(Math.random() * this._userCategoryNum);

      console.log(` - User ${this._users[i]} has ${categoryNum} categories added.`);

      for (let j = 0; j < categoryNum; j += 1) {
        pending.push(this._database.category.create(
          this._users[i],
          CATEGORY_NAMES[Math.floor(Math.random() * CATEGORY_NAMES.length)],
          '',
        ));
      }
    }

    await Promise.all(pending);

    for (let i = 0; i < this._users.length; i += 1) {
      const categories = await this._database.category.selectUserCategories(this._users[i]);

      for (let j = 0; j < categories.length; j += 1) {
        this._categories.push(categories[j].id);
      }
    }

    this._spacing();
  }
  
  async _createFakeReviews(): Promise<void> {
    console.log(`Creating at max ${this._userReviewNum} fake reviews per user.`);

    const pending = [];

    for (let i = 0; i < this._users.length; i += 1) {
      const reviewNum = Math.floor(Math.random() * this._userReviewNum);
      const showsDone = [] as number[];

      console.log(` - User ${this._users[i]} has ${reviewNum} reviews added.`);

      for (let j = 0; j < reviewNum; j += 1) {
        const show = this._shows[Math.floor(Math.random() * this._shows.length)];

        if (!(showsDone.includes(show))) {
          pending.push(this._database.review.create(
            show,
            this._users[i],
            REVIEW_NAMES[Math.floor(Math.random() * REVIEW_NAMES.length)],
            Math.floor(Math.random() * 10) + 1,
            REVIEW_DESCRIPTIONS[Math.floor(Math.random() * REVIEW_DESCRIPTIONS.length)],
          ));

          showsDone.push(show);
        }
      }
    }

    await Promise.all(pending);
  }
  
  async _createFakeShowPlatforms(): Promise<void> {
    console.log(`Creating at max ${2} fake platforms per show.`);

    const pending = [];

    const platforms = await this._database.platform.getAll();

    for (let i = 0; i < this._shows.length; i += 1) {
      const platformNum = Math.floor(Math.random() * 2);

      console.log(` - Show ${this._shows[i]} has ${platformNum} platforms added.`);

      const platformsAdded = [] as number[];

      for (let j = 0; j < platformNum; j += 1) {
        const platform = platforms[Math.floor(Math.random() * platforms.length)];

        if (!(platformsAdded.includes(platform.id))) {
          pending.push(this._database.showPlatform.add(
            this._shows[i],
            platform.id,
          ));

          platformsAdded.push(platform.id);
        }
      }
    }

    await Promise.all(pending);
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

  async _createShows(): Promise<void> {
    let showNum = (this._userShowNum * 0.5) * this._userNum;

    if (showNum > 1000) {
      showNum = 1000;
    }

    console.log(` - Collecting Shows for use.`);

    let state = 0;

    const pending = [];
    let addedNum = 0;

    const genres = {} as Record<number, number[]>;

    while (addedNum < showNum) {
      let response;
      let items = [] as IShow[];
      const page = Math.floor(state / 4) + 1;

      if (state % 4 === 0) {
        response = await api.themoviedb.movie.getPopularMovies(page);
        items = await convertSimplifiedMovies(response.results);
      } else if (state % 4 === 1) {
        response = await api.themoviedb.tvShow.getPopularTvShows(page);
        items = await convertSimplifiedTvShows(response.results);
      } else if (state % 4 === 2) {
        response = await api.themoviedb.movie.getTopRatedMovies(page);
        items = await convertSimplifiedMovies(response.results);
      } else if (state % 4 === 3) {
        response = await api.themoviedb.tvShow.getTopRatedTvShows(page);
        items = await convertSimplifiedTvShows(response.results);
      }

      for (let i = 0; i < items.length; i += 1) {
        genres[response.results[i].id] = response.results[i].genre_ids;

        pending.push(this._database.show.add(
          items[i].name,
          items[i].type,
          items[i].posterUrl,
          items[i].backdropUrl,
          items[i].releaseDate,
          items[i].overview,
          items[i].theMovieDbId,
        ));

        addedNum += 1;
      }

      console.log(` - Shows Loaded: ${addedNum} / ${showNum}`);

      state += 1;
    }

    await Promise.all(pending);

    const shows = await this._database.show.getAll();

    const pendingGenres = [];

    for (let i = 0; i < shows.length; i += 1) {
      this._shows.push(shows[i].id);

      const showGenres = genres[shows[i].theMovieDbId];

      for (let j = 0; j < showGenres.length; j += 1) {
        pendingGenres.push(this._database.showGenre.add(
          shows[i].id,
          showGenres[j],
        ));
      }
    }

    await Promise.all(pendingGenres);
  }

  async _getRandomShow(): Promise<number> {
    if (this._shows.length === 0) {
      await this._createShows();
    }
    const index = Math.floor(Math.random() * this._shows.length);

    return this._shows[index];
  }
  
  async _createFakeUserShows(): Promise<void> {
    console.log(`Creating at max ${this._userShowNum} fake added shows per user.`);

    const pending = [];

    for (let i = 0; i < this._users.length; i += 1) {
      const showsNum = Math.floor(Math.random() * this._userShowNum);

      console.log(` - User ${this._users[i]} has ${showsNum} shows added.`);

      for (let j = 0; j < showsNum; j += 1) {
        const showId = await this._getRandomShow();

        const isAdded = await this._database.userShow.isShowAdded(
          this._users[i],
          showId,
        );

        if (!isAdded) {
          pending.push(this._database.userShow.add(
            this._users[i],
            showId,
          ));
        }
      }
    }

    await Promise.all(pending);

    this._spacing();
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

    const pending = [];

    for (let i = 0; i < this._categories.length; i += 1) {
      const showNum = Math.floor(Math.random() * this._categoryShowNum);
      
      console.log(` - Creating ${showNum} shows for category ${this._categories[i]}.`);

      const addedShows = [] as number[];

      for (let j = 0; j < showNum; j += 1) {
        const show = await this._getRandomShow();

        if (!addedShows.includes(show)) {
          pending.push(this._database.categoryShow.add(
            this._categories[i],
            show,
          ));

          addedShows.push(show);
        }
      }
    }

    await Promise.all(pending);
  }
}

const dataCreator = new SampleDataCreator();
dataCreator.start();
