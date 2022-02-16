// Local Imports
import { CategoryShow as CategoryShowClass } from './category-show';
import { Category as CategoryClass } from './category';
import { Genre as GenreClass } from './genre';
import { Platform as PlatformClass } from './platform';
import { Review as ReviewClass } from './review';
import { ShowGenre as ShowGenreClass } from './show-genre';
import { ShowPlatform as ShowPlatformClass } from './show-platform';
import { Show as ShowClass } from './show';
import { UserFollow as UserFollowClass } from './user-follow';
import { UserShow as UserShowClass } from './user-show';
import { UserToken as UserTokenClass } from './user-token';
import { User as UserClass } from './user';

// Exports
export const CategoryShow = new CategoryShowClass();
export const Category = new CategoryClass();
export const Genre = new GenreClass();
export const Platform = new PlatformClass();
export const Review = new ReviewClass();
export const ShowGenre = new ShowGenreClass();
export const ShowPlatform = new ShowPlatformClass();
export const Show = new ShowClass();
export const UserFollow = new UserFollowClass();
export const UserShow = new UserShowClass();
export const UserToken = new UserTokenClass();
export const User = new UserClass();
