export type IDatabaseColumnTypes = string | number | boolean | null | undefined;

export type IDatabaseObject = Record<string, IDatabaseColumnTypes>;

export interface IUser extends IDatabaseObject {
  id?: number;
  name: string;
  username: string;
  password?: string;
  private: boolean;
  imageUrl: string;
  joined: number;
}

export interface IUserFollow extends IDatabaseObject {
  userId: number;
  followingUserId: number;
}

export interface IShow extends IDatabaseObject {
  id?: number;
  name: string;
  type: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: number;
  overview: string;
  theMovieDbId: number;
}

export interface IPlatform extends IDatabaseObject {
  id?: number;
  name: string;
  imageUrl: string;
  cost: number;
}

export interface ICategory extends IDatabaseObject {
  id?: number;
  userId: number;
  name: string;
  description: string;
  created: number;
}

export interface IReview extends IDatabaseObject {
  id?: number;
  showId: number;
  userId: number;
  name: string;
  rating: number;
  description: string;
  created: number;
  updated: number;
}

export interface ICategoryShow extends IDatabaseObject {
  categoryId: number;
  showId: number;
  added: number;
}

export interface IFollow extends IDatabaseObject {
  userId: number;
  followingUserId: number;
}

export interface IGenre extends IDatabaseObject {
  id?: number;
  name: string;
}

export interface IShowGenre extends IDatabaseObject {
  showId: number;
  genreId: number;
}

export interface IUserShow extends IDatabaseObject {
  userId: number;
  showId: number;
  added: number;
}

export interface IUserToken extends IDatabaseObject {
  id?: number;
  userId: number;
  token: string;
}

export interface IShowPlatform extends IDatabaseObject {
  showId: number;
  platformId: number;
}

export interface ICategoryShowObject extends Record<string, IDatabaseColumnTypes> {
  id: number;
  name: string;
  type: string;
  posterUrl: string;
  releaseDate: number;
  overview: string;
  added: number;
}

export interface IUserCategoryObject extends Record<string, IDatabaseColumnTypes> {
  id: number;
  userId: number;
  name: string;
  description: string;
  created: number;
  username: string;
  imageUrl: string;
  private: boolean;
}

export interface IShowReviewObject extends Record<string, IDatabaseColumnTypes> {
  userId: number;
  showId: number;
  name: string;
  rating: number;
  description: string;
  private: boolean;
  username: string;
  imageUrl: string;
}

export interface IUserReviewObject extends Record<string, IDatabaseColumnTypes> {
  showId: number;
  userId: number;
  name: string;
  rating: number;
  description: string;
  created: number;
  updated: number;
  showName: string;
  type: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: number;
  overview: string;
  username: string;
  imageUrl: string;
  private: boolean;
}

export interface IShowGenreObject extends Record<string, IDatabaseColumnTypes> {
  genreId: number;
  name: string;
}

export interface IGenreShowObject extends Record<string, IDatabaseColumnTypes> {
  showId: number;
  name: string;
  type: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: number;
  overview: string;
}

export interface IShowPlatformObject extends Record<string, IDatabaseColumnTypes> {
  platformId: number;
  name: string;
  imageUrl: string;
  cost: number;
}

export interface IPlatformShowObject extends Record<string, IDatabaseColumnTypes> {
  showId: number;
  name: string;
  type: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: number;
  overview: string;
}

export interface IUserFollowObject extends Record<string, IDatabaseColumnTypes> {
  id: number;
  username: string;
  imageUrl: string;
}

export interface IUserShowObject extends Record<string, IDatabaseColumnTypes> {
  id: number;
  added: number;
  name: string;
  type: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: number;
  overview: string;
}

export interface IShowUserObject extends Record<string, IDatabaseColumnTypes> {
  added: number;
  userId: number;
  username: string;
  imageUrl: string;
}

export interface IPublicUserObject extends Record<string, IDatabaseColumnTypes> {
  id: number;
  name: string;
  username: string;
  private: boolean;
  imageUrl: string;
}
