// Packages
import {
  ICategory,
  IGenre,
  IPlatform,
  IReview,
  IShow,
  IUser,
  ICategoryShowObject,
  IUserCategoryObject,
  IShowReviewObject,
  IUserReviewObject,
  IShowGenreObject,
  IGenreShowObject,
  IShowPlatformObject,
  IPlatformShowObject,
  IUserFollowObject,
  IUserShowObject,
  IShowUserObject,
  IPublicUserObject,
  IUserFollow,
} from '../../../shared/types';

/**
 * Shared properties for all The Movie DB objects.
 */
interface IMovieDbObject {
  id: number;
}

/**
 * The Movie DB objects with names.
 */
interface IMovieDbNambeableObject {
  name: string;
}

/**
 * The Movie DB objects with nationality descriptors.
 */
interface IMovieDbNationalityObject {
  iso_3166_1: string;
}

/**
 * The Movie DB representation of a genre.
 */
export interface IMovieDbGenre extends IMovieDbObject, IMovieDbNambeableObject {
}

/**
 * The Movie DB representation of a production company.
 */
export interface IMovieDbProductionCompany extends IMovieDbObject, IMovieDbNambeableObject {
  logo_path: string | null;
  origin_country: string;
}

/**
 * The Movie DB representation of a country.
 */
export interface IMovieDbProductionCountry extends IMovieDbNambeableObject, IMovieDbNationalityObject {
}

/**
 * The Movie DB representation of a language.
 */
export interface IMovieDbSpokenLanguage extends IMovieDbNambeableObject, IMovieDbNationalityObject {
}

/**
 * The Movie DB representation of a movie.
 */
export interface IMovieDbMovie extends IMovieDbObject {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any | null;
  budget: number;
  genres: IMovieDbGenre[];
  homepage: string;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IMovieDbProductionCompany[];
  production_countries: IMovieDbProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: IMovieDbSpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * The Movie DB representation of a movie's cast or crew member.
 */
interface IMovieDbMovieParticipant extends IMovieDbObject, IMovieDbNambeableObject {
  adult: boolean;
  gender: number | null;
  known_for_department: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

/**
 * The Movie DB representation of a cast member.
 */
export interface IMovieDbMovieCastMember extends IMovieDbMovieParticipant {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

/**
 * The Movie Db representation of a crew member.
 */
export interface IMovieDbMovieCrewMember extends IMovieDbMovieParticipant {
  credit_id: string;
  department: string;
  job: string;
}

/**
 * The Movie DB representation of a movie's credits.
 */
export interface IMovieDbMovieCredits extends IMovieDbObject {
  cast: IMovieDbMovieCastMember[];
  crew: IMovieDbMovieCrewMember[];
}

/**
 * The Movie DB representation of an image.
 */
export interface IMovieDbImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

/**
 * The Movie DB representation of a backdrop image.
 */
export interface IMovieDbBackdropImage extends IMovieDbImage {
}

/**
 * The Movie DB representation of a poster image.
 */
export interface IMovieDbPosterImage extends IMovieDbImage {
}

/**
 * The Movie DB representation of a movie's images
 */
export interface IMovieDbItemImages extends IMovieDbObject {
  backdrops: IMovieDbBackdropImage[];
  posters: IMovieDbPosterImage[];
}

/**
 * The Movie DB representation of a simplified movie.
 */
export interface IMovieDbMovieSimplified extends IMovieDbObject {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * A page query from The Movie DB.
 */
export interface IMovieDbPageObject<T> {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
}

/**
 * The Movie DB representation of a TV show creator.
 */
interface IMovieDbTvShowCreator extends IMovieDbObject, IMovieDbNambeableObject {
  credit_id: string;
  gender: number;
  profile_path: string | null;
}

/**
 * The Movie DB representation of a TV show episode air date.
 */
interface IMovieDbTvShowEpisodeAirDate extends IMovieDbObject, IMovieDbNambeableObject {
  air_date: string;
  episode_number: number;
  overview: string;
  production_code: string;
  season: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

/**
 * The Movie DB representation of a TV show network.
 */
interface IMovieDbTvShowNetwork extends IMovieDbObject, IMovieDbNambeableObject {
  logo_path: string | null;
  origin_country: string;
}

/**
 * The Movie DB representation of a TV show season.
 */
interface IMovieDbTvShowSeason extends IMovieDbObject, IMovieDbNambeableObject {
  air_date: string;
  episode_count: number;
  overview: string;
  poster_path: string;
  season_number: number;
}

/**
 * The Movie DB representation of a TV shwo spoken language.
 */
interface IMovieDbTvShowSpokenLanguage extends IMovieDbNationalityObject {
  english_name: string;
}

/**
 * The Movie DB representation of a TV show.
 */
export interface IMovieDbTvShow extends IMovieDbObject, IMovieDbNambeableObject {
  backdrop_path: string | null;
  created_by: IMovieDbTvShowCreator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: IMovieDbGenre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: IMovieDbTvShowEpisodeAirDate;
  next_episode_to_air: null;
  networks: IMovieDbTvShowNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: IMovieDbProductionCompany[];
  production_countries: IMovieDbProductionCountry[];
  seasons: IMovieDbTvShowSeason[];
  spoken_languages: IMovieDbTvShowSpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

/**
 * The Movie DB representation of a TV show cast or crew member.
 */
interface IMovieDbTvShowParticipant extends IMovieDbObject, IMovieDbNambeableObject {
  adult: boolean;
  gender: number | null;
  known_for_department: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  total_episode_count: number;
}

/**
 * The Movie DB representation of a TV show cast member's role.
 */
interface IMovieDbTvShowCastMemberRole {
  credit_id: string;
  character: string;
  episode_count: number;
}

/**
 * The Movie DB representation of a TV show crew member's job.
 */
interface IMovieDbTvShowCrewMemberJob {
  credit_id: string;
  character: string;
  episode_count: number;
}

/**
 * The Movie DB representation of a TV show cast member.
 */
export interface IMovieDbTvShowCastMember extends IMovieDbTvShowParticipant {
  roles: IMovieDbTvShowCastMemberRole[],
  order: number;
}

/**
 * The Movie DB representation of a TV show crew member.
 */
export interface IMovieDbTvShowCrewMember extends IMovieDbTvShowParticipant {
  jobs: IMovieDbTvShowCrewMemberJob[],
  department: string;
}

/**
 * The Movie DB representation of a TV show's credits.
 */
export interface IMovieDbTvShowCredits extends IMovieDbObject {
  cast: IMovieDbTvShowCastMember[];
  crew: IMovieDbTvShowCrewMember[];
}

/**
 * The Movie DB representation of a TV show simplified.
 */
export interface IMovieDbTvShowSimplified extends IMovieDbObject, IMovieDbNambeableObject {
  poster_path: string | null;
  popularity: number;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  original_name: string;
}

/**
 * The Movie DB return of a genre list.
 */
export interface IMovieDbGenreList {
  genres: IMovieDbGenre[];
}

/**
 * Data Access Object interface.
 */
export interface IDataAccessObject {
  createTable: () => Promise<void>;
  dropTable: () => Promise<void>;
  deleteAll: () => Promise<void>;
}

export interface ICategoryShowDAO extends IDataAccessObject {
  add: (
    categoryId: number,
    showId: number,
  ) => Promise<number>;
  remove: (
    categoryId: number,
    showId: number,
  ) => Promise<number>;
  selectCategoryShows: (categoryId: number) => Promise<ICategoryShowObject[]>;
}

export interface ICategoryDAO extends IDataAccessObject {
  create: (
    userId: number,
    name: string,
    description: string,
  ) => Promise<number>;
  update: (
    id: number,
    name: string,
    description: string,
  ) => Promise<number>;
  delete: (id: number) => Promise<number>;
  select: (id: number) => Promise<ICategory | null>;
  selectUserCategories: (userId: number) => Promise<IUserCategoryObject[]>;
}

export interface IGenreDAO extends IDataAccessObject {
  insert: (
    id: number,
    name: string,
  ) => Promise<number>;
  select: (id: number) => Promise<IGenre | null>;
}

export interface IPlatformDAO extends IDataAccessObject {
  create: (
    name: string,
    imageUrl: string,
    cost: number,
  ) => Promise<number>;
  delete: (id: number) => Promise<number>;
  update: (
    id: number,
    name: string,
    imageUrl: string,
    cost: number,
  ) => Promise<number>;
  getAll: () => Promise<IPlatform[]>;
}

export interface IReviewDAO extends IDataAccessObject {
  create: (
    showId: number,
    userId: number,
    name: string,
    rating: number,
    description: string,
  ) => Promise<number>;
  delete: (id: number) => Promise<number>;
  update: (
    id: number,
    name: string,
    rating: number,
    description: string,
  ) => Promise<number>;
  getById: (id: number) => Promise<IUserReviewObject>;
  getUserShowReview: (
    userId: number,
    showId: number,
  ) => Promise<IUserReviewObject>;
  getUserReviews: (userId: number) => Promise<IUserReviewObject[]>;
  getShowReviews: (showId: number) => Promise<IShowReviewObject[]>;
}

export interface IShowGenreDAO extends IDataAccessObject {
  add: (
    showId: number,
    genreId: number,
  ) => Promise<number>;
  getShowGenres: (showId: number) => Promise<IShowGenreObject[]>;
  getGenreShows: (genreId: number) => Promise<IGenreShowObject[]>;
}

export interface IShowPlatformDAO extends IDataAccessObject {
  add: (
    showId: number,
    platformId: number,
  ) => Promise<number>;
  remove: (
    showId: number,
    platformId: number,
  ) => Promise<number>;
  getShowPlatforms: (showId: number) => Promise<IShowPlatformObject[]>;
  getPlatformShows: (platformId: number) => Promise<IPlatformShowObject[]>;
}

export interface IShowDAO extends IDataAccessObject {
  add: (
    name: string,
    type: string,
    posterUrl: string,
    backdropUrl: string,
    releaseDate: number,
    overview: string,
  ) => Promise<number>;
  delete: (id: number) => Promise<number>;
  select: (id: number) => Promise<IShow | null>;
  getAll: () => Promise<IShow[]>;
}

export interface IUserFollowDAO extends IDataAccessObject {
  follow: (
    userId: number,
    followingUserId: number,
  ) => Promise<number>;
  unfollow: (
    userId: number,
    followingUserId: number,
  ) => Promise<number>;
  getFollow: (
    userId: number,
    followingUserId: number,
  ) => Promise<IUserFollow>
  getFollowers: (userId: number) => Promise<IUserFollowObject[]>;
  getFollowings: (userId: number) => Promise<IUserFollowObject[]>;
}

export interface IUserShowDAO extends IDataAccessObject {
  add: (
    userId: number,
    showId: number,
  ) => Promise<number>;
  remove: (
    userId: number,
    showId: number,
  ) => Promise<number>;
  isShowAdded: (
    userId: number,
    showId: number,
  ) => Promise<boolean>;
  getUserShows: (userId: number) => Promise<IUserShowObject[]>;
  getUserMovies: (userId: number) => Promise<IUserShowObject[]>;
  getUserTvShows: (userId: number) => Promise<IUserShowObject[]>;
  getShowUsers: (showId: number) => Promise<IShowUserObject[]>;
}

export interface IUserTokenDAO extends IDataAccessObject {
  register: (
    userId: number,
    token: string,
  ) => Promise<number>;
  revoke: (
    userId: number,
    token: string,
  ) => Promise<number>;
  revokeUser: (userId: number) => Promise<number>;
  validate: (
    userId: number,
    token: string,
  ) => Promise<boolean>;
}

export interface IUserDAO extends IDataAccessObject {
  register: (
    name: string,
    username: string,
    password: string,
    privateMode: boolean,
    imageUrl: string,
  ) => Promise<number>;
  getUser: (id: number) => Promise<IPublicUserObject | null>;
  getMe: (id: number) => Promise<IUser | null>;
  getUserByUsername: (username: string) => Promise<IPublicUserObject | null>;
  getMeByUsername: (username: string) => Promise<IUser | null>;
  update: (
    id: number,
    name: string,
    username: string,
    password: string,
    privateMode: boolean,
    imageUrl: string,
  ) => Promise<number>;
}

/**
 * Object defining a query filter.
 */
export interface IQueryConditions {
  [key: string]: string | number | boolean | null;
}

/**
 * Object defining a query update.
 */
export interface IQueryUpdate {
  [key: string]: string | number | boolean | null;
}

/**
 * Update defining a query projection.
 */
export interface IQueryProjection {
  [key: string]: boolean;
}

export interface IMariaDBQuery {
  namedPlaceholders: boolean;
  sql: string;
}

export interface IMariaDbParams {
  [key: string]: string | number | boolean | null;
}

export type IMariaDbQuery = [
  IMariaDBQuery,
  IMariaDbParams,
];
