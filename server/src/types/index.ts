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
interface IMoveDbMovieParticipant extends IMovieDbObject, IMovieDbNambeableObject {
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
export interface IMovieDbCastMember extends IMoveDbMovieParticipant {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

/**
 * The Movie Db representation of a crew member.
 */
export interface IMovieDbCrewMember extends IMoveDbMovieParticipant {
  credit_id: string;
  department: string;
  job: string;
}

/**
 * The Movie DB representation of a movie's credits.
 */
export interface IMovieDbMovieCredits extends IMovieDbObject {
  cast: IMovieDbCastMember[];
  crew: IMovieDbCrewMember[];
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
export interface IMovieDbMovieImages extends IMovieDbObject {
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
