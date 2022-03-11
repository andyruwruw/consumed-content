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
      releaseDate: (new Date(movie.release_date)).getTime(),
      overview: movie.overview,
    };
  });
};

/**
 * Converts The Movie DB simplified movies into our own format.
 *
 * @param {IMovieDbMovieSimplified[]} movies Simplified movies to convert.
 * @returns {IShow[]} Converted movies.
 */
export const convertSimplifiedMovies = (movies: IMovieDbMovieSimplified[]): IShow[] => {
  return movies.map((movie: IMovieDbMovieSimplified): IShow => {
    const date = movie.release_date.split('-') as unknown as [number, number, number];
    return {
      name: movie.title,
      type: 'movie',
      posterUrl: movie.poster_path,
      backdropUrl: movie.backdrop_path,
      releaseDate: (new Date(...date)).getTime() || null,
      overview: movie.overview,
    };
  });
};

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
      releaseDate: (new Date(tvShow.first_air_date)).getTime(),
      overview: tvShow.overview,
    };
  });
};

/**
 * Converts The Movie DB simplified TV shows into our own format.
 *
 * @param {IMovieDbTvShowSimplified[]} tvShows Simplified TV shows to convert.
 * @returns {IShow[]} Converted TV shows.
 */
export const convertSimplifiedTvShows = (tvShows: IMovieDbTvShowSimplified[]): IShow[] => {
  return tvShows.map((tvShow: IMovieDbTvShowSimplified): IShow => {
    const date = tvShow.first_air_date.split('-') as unknown as [number, number, number];
    return {
      name: tvShow.name,
      type: 'movie',
      posterUrl: tvShow.poster_path,
      backdropUrl: tvShow.backdrop_path,
      releaseDate: (new Date(...date)).getTime() || null,
      overview: tvShow.overview,
    };
  });
};
