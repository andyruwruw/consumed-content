// Local Imports
import { CheckUserHandler as CheckUserHandlerClass } from './check-user-handler';
import { CreateReviewHandler as CreateReviewHandlerClass } from './create-review-handler';
import { EditReviewHandler as EditReviewHandlerClass } from './edit-review-handler';
import { FollowHandler as FollowHandlerClass } from './follow-handler';
import { GetCategoriesHandler as GetCategoriesHandlerClass } from './get-categories-handler';
import { GetReviewsHandler as GetReviewsHandlerClass } from './get-reviews-handler';
import { GetShowsHandler as GetShowsHandlerClass } from './get-shows-handler';
import { GetUserCategoriesHandler as GetUserCategoriesHandlerClass } from './get-user-categories-handler';
import { GetUserReviewsHandler as GetUserReviewsHandlerClass } from './get-user-reviews-handler';
import { GetUserShowsHandler as GetUserShowsHandlerClass } from './get-user-shows-handler';
import { LoginHandler as LoginHandlerClass } from './login-handler';
import { LogoutHandler as LogoutHandlerClass } from './logout-handler';
import { RegisterHandler as RegisterHandlerClass } from './register-handler';

// Export instances.
export const CheckUserHandler = new CheckUserHandlerClass();
export const CreateReviewHandler = new CreateReviewHandlerClass();
export const EditReviewHandler = new EditReviewHandlerClass();
export const FollowHandler = new FollowHandlerClass();
export const GetCategoriesHandler = new GetCategoriesHandlerClass();
export const GetReviewsHandler = new GetReviewsHandlerClass();
export const GetShowsHandler = new GetShowsHandlerClass();
export const GetUserCategoriesHandler = new GetUserCategoriesHandlerClass();
export const GetUserReviewsHandler = new GetUserReviewsHandlerClass();
export const GetUserShowsHandler = new GetUserShowsHandlerClass();
export const LoginHandler = new LoginHandlerClass();
export const LogoutHandler = new LogoutHandlerClass();
export const RegisterHandler = new RegisterHandlerClass();
