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
  FollowHandler,
  GetCategoryShowsHandler,
  GetShowReviewsHandler,
  GetUserCategoriesHandler,
  GetUserFollowersHandler,
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
} from './handlers';
import { Environment } from './helpers/environment';

const app = express();

app.use(cookieParser());

app.get('/api/add-show', AddShowHandler.execute);

app.get('/api/check-user', CheckUserHandler.execute);

app.get('/api/create-review', CreateReviewHandler.execute);

app.get('/api/delete-review', DeleteReviewHandler.execute);

app.get('/api/edit-review', EditReviewHandler.execute);

app.get('/api/follow', FollowHandler.execute);

app.get('/api/get-category-shows', GetCategoryShowsHandler.execute);

app.get('/api/get-show-reviews', GetShowReviewsHandler.execute);

app.get('/api/get-user-categories', GetUserCategoriesHandler.execute);

app.get('/api/get-user-followers', GetUserFollowersHandler.execute);

app.get('/api/get-user-following', GetUserFollowingHandler.execute);

app.get('/api/get-user-reviews', GetUserReviewsHandler.execute);

app.get('/api/get-user-shows', GetUserShowsHandler.execute);

app.get('/api/get-user', GetUserHandler.execute);

app.get('/api/login', LoginHandler.execute);

app.get('/api/logout', LogoutHandler.execute);

app.get('/api/register', RegisterHandler.execute);

app.get('/api/remove-show', RemoveShowHandler.execute);

app.get('/api/search-movies', SearchMoviesHandler.execute);

app.get('/api/search-tv-shows', SearchTvShowsHandler.execute);

app.get('/api/unfollow', UnfollowHandler.execute);

app.listen(Environment.getPort(), () => {
  console.log(`Listening on port ${Environment.getPort()}`);
});
