export interface IUser {
  id?: number;
  name: string;
  username: string;
  password?: string;
  salt?: string;
  private: boolean;
  imageUrl: string;
}

export interface IUserFollow {
  userId: string;
  followingUserId: string;
}

export interface IShow {
  id?: number;
  name: string;
  type: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  overview: string;
}

export interface IPlatform {
  id?: number;
  name: string;
  imageUrl: string;
  cost: number;
}

export interface ICategory {
  id?: number;
  userId: number;
  name: string;
}

export interface IReview {
  id?: number;
  showId: number;
  userId: number;
  name: string;
  rating: number;
  description: string;
}

export interface ICategoryShow {
  categoryId: number;
  showId: number;
  index: number;
  addedDate: string;
}

export interface IFollow {
  userId: number;
  followingUserId: number;
}

export interface IGenre {
  id?: number;
  name: string;
}

export interface IShowGenre {
  showId: number;
  genreId: string;
}

export interface IUserShow {
  userId: number;
  showId: number;
  added: number;
}

export interface IUserToken {
  id?: number;
  userId: number;
  token: string;
}

export interface IShowPlatform {
  showId: number;
  platformId: number;
}
