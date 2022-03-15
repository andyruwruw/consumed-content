// Packages
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

// Local Imports
import {
  AddShowHandler,
  CheckUserHandler,
  CreateReviewHandler,
  DeleteReviewHandler,
  EditReviewHandler,
  EditUserHandler,
  FollowHandler,
  GetCategoryShowsHandler,
  GetShowGenresHandler,
  GetShowListHandler,
  GetShowReviewsHandler,
  GetUserCategoriesHandler,
  GetUserFollowersHandler,
  GetShowHandler,
  GetUserFollowingHandler,
  GetUserHandler,
  GetUserReviewsHandler,
  GetUserShowsHandler,
  LoginHandler,
  LogoutHandler,
  RegisterHandler,
  RemoveShowHandler,
  SearchMoviesHandler,
  SearchTvShowsHandler,
  UnfollowHandler,
  CreateCategoryHandler,
  GetCategoryHandler,
  DeleteCategoryHandler,
  EditCategoryHandler,
  AddShowToCategoryHandler,
  RemoveShowFromCategoryHandler,
} from './handlers';
import { Environment } from './helpers/environment';
import { getDatabase } from './database';

const database = getDatabase();
database.connect();

const app = express();

app.use(cookieParser());

app.get('/api/add-show-to-category', (req, res) => AddShowToCategoryHandler.execute(req, res));

app.get('/api/add-show', (req, res) => AddShowHandler.execute(req, res));

app.get('/api/check-user', (req, res) => CheckUserHandler.execute(req, res));

app.get('/api/create-category', (req, res) => CreateCategoryHandler.execute(req, res));

app.get('/api/create-review', (req, res) => CreateReviewHandler.execute(req, res));

app.get('/api/delete-review', (req, res) => DeleteReviewHandler.execute(req, res));

app.get('/api/delete-category', (req, res) => DeleteCategoryHandler.execute(req, res));

app.get('/api/edit-review', (req, res) => EditReviewHandler.execute(req, res));

app.get('/api/edit-user', (req, res) => EditUserHandler.execute(req, res));

app.get('/api/edit-category', (req, res) => EditCategoryHandler.execute(req, res));

app.get('/api/follow', (req, res) => FollowHandler.execute(req, res));

app.get('/api/get-category', (req, res) => GetCategoryHandler.execute(req, res));

app.get('/api/get-category-shows', (req, res) => GetCategoryShowsHandler.execute(req, res));

app.get('/api/get-show-genres', (req, res) => GetShowGenresHandler.execute(req, res));

app.get('/api/get-show-list', (req, res) => GetShowListHandler.execute(req, res));

app.get('/api/get-show-reviews', (req, res) => GetShowReviewsHandler.execute(req, res));

app.get('/api/get-user-categories', (req, res) => GetUserCategoriesHandler.execute(req, res));

app.get('/api/get-user-followers', (req, res) => GetUserFollowersHandler.execute(req, res));

app.get('/api/get-user-following', (req, res) => GetUserFollowingHandler.execute(req, res));

app.get('/api/get-user-reviews', (req, res) => GetUserReviewsHandler.execute(req, res));

app.get('/api/get-user-shows', (req, res) => GetUserShowsHandler.execute(req, res));

app.get('/api/get-show', (req, res) => GetShowHandler.execute(req, res));

app.get('/api/get-user', (req, res) => GetUserHandler.execute(req, res));

app.get('/api/login', (req, res) => LoginHandler.execute(req, res));

app.get('/api/logout', (req, res) => LogoutHandler.execute(req, res));

app.get('/api/register', (req, res) => RegisterHandler.execute(req, res));

app.get('/api/remove-show-from-category', (req, res) => RemoveShowFromCategoryHandler.execute(req, res));

app.get('/api/remove-show', (req, res) => RemoveShowHandler.execute(req, res));

app.get('/api/search-movies', (req, res) => SearchMoviesHandler.execute(req, res));

app.get('/api/search-tv-shows', (req, res) => SearchTvShowsHandler.execute(req, res));

app.get('/api/unfollow', (req, res) => UnfollowHandler.execute(req, res));

app.listen(Environment.getPort(), () => {
  console.log(`Listening on port ${Environment.getPort()}`);
});
