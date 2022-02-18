// Packages
import { IDatabaseColumnTypes } from '../../../shared/types';

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
export interface IDataAccessObject<T> {
  createTable: () => Promise<void>;
  insert: (item: T) => Promise<number>;
  find: (
    conditions?: IQueryConditions,
    projection?: IQueryProjection,
  ) => Promise<Record<string, IDatabaseColumnTypes>[]>;
  delete: (conditions?: IQueryConditions) =>Promise<number>
  update: (
    conditions?: IQueryConditions,
    update?: IQueryUpdate,
  ) => Promise<number>;
  findOne: (
    conditions?: IQueryConditions,
    projection?: IQueryProjection,
  ) => Promise<Record<string, IDatabaseColumnTypes> | null>;
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