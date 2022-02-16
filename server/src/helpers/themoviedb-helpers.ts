// Types
import {
  IMovieDbMovie,
  IMovieDbMovieSimplified,
  IMovieDbTvShow,
  IMovieDbTvShowSimplified,
} from '../types';
import { IShow } from '../../../shared/types';

/**
 * Converts The Movie DB movies into our own format.
 *
 * @param {IMovieDbMovie[]} movies Movies to convert.
 * @returns {IShow[]} Converted movies.
 */
export const convertMovies = (movies: IMovieDbMovie[]): IShow[] => {
  return movies.map((movie: IMovieDbMovie): IShow => {
    return {
      name: movie.title,
      type: 'movie',
      posterUrl: movie.poster_path,
      backdropUrl: movie.backdrop_path,
      releaseDate: movie.release_date,
      overview: movie.overview,
    };
  });
}

/**
 * Converts The Movie DB simplified movies into our own format.
 *
 * @param {IMovieDbMovieSimplified[]} movies Simplified movies to convert.
 * @returns {IShow[]} Converted movies.
 */
export const convertSimplifiedMovies = (movies: IMovieDbMovieSimplified[]): IShow[] => {
  return movies.map((movie: IMovieDbMovieSimplified): IShow => {
    return {
      name: movie.title,
      type: 'movie',
      posterUrl: movie.poster_path,
      backdropUrl: movie.backdrop_path,
      releaseDate: movie.release_date,
      overview: movie.overview,
    };
  });
}

/**
 * Converts The Movie DB TV shows into our own format.
 *
 * @param {IMovieDbTvShow[]} tvShows TV shows to convert.
 * @returns {IShow[]} Converted TV shows.
 */
export const convertTvShows = (tvShows: IMovieDbTvShow[]): IShow[] => {
  return tvShows.map((tvShow: IMovieDbTvShow): IShow => {
    return {
      name: tvShow.name,
      type: 'tv-show',
      posterUrl: tvShow.poster_path,
      backdropUrl: tvShow.backdrop_path,
      releaseDate: tvShow.first_air_date,
      overview: tvShow.overview,
    };
  });
}

/**
 * Converts The Movie DB simplified TV shows into our own format.
 *
 * @param {IMovieDbTvShowSimplified[]} tvShows Simplified TV shows to convert.
 * @returns {IShow[]} Converted TV shows.
 */
export const convertSimplifiedTvShows = (tvShows: IMovieDbTvShowSimplified[]): IShow[] => {
  return tvShows.map((movie: IMovieDbTvShowSimplified): IShow => {
    return {
      name: movie.name,
      type: 'movie',
      posterUrl: movie.poster_path,
      backdropUrl: movie.backdrop_path,
      releaseDate: movie.first_air_date,
      overview: movie.overview,
    };
  });
}
