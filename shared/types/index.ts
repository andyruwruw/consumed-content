export type IDatabaseColumnTypes = string | number | boolean | null;

export type IDatabaseObject = Record<string, IDatabaseColumnTypes>;

export interface IUser extends IDatabaseObject {
  id?: number;
  name: string;
  username: string;
  password?: string;
  private: boolean;
  imageUrl: string;
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
  releaseDate: string;
  overview: string;
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
}

export interface IReview extends IDatabaseObject {
  id?: number;
  showId: number;
  userId: number;
  name: string;
  rating: number;
  description: string;
}

export interface ICategoryShow extends IDatabaseObject {
  categoryId: number;
  showId: number;
  index: number;
  addedDate: string;
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
  genreId: string;
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
