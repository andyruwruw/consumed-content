// Local Imports
import request from './request';

// Types
import {
  IMovieDbGenre,
  IMovieDbGenreList,
} from '../../types';

/**
 * Cache for movie genres.
 */
let movieGenres = [] as IMovieDbGenre[];

/**
 * Cache for TV show genres.
 */
 let tvShowGenres = [] as IMovieDbGenre[];

/**
 * Gets a list of movie genres.
 *
 * @returns {Promise<IMovieDbGenreList | null>} List of movie genres.
 */
const getMovieGenres = async (): Promise<IMovieDbGenreList | null> => {
  if (movieGenres.length) {
    return {
      genres: movieGenres,
    };
  }

  try {
    const response =  await request.get(`/genre/movie/list`);

    if (response.status === 200) {
      if (!movieGenres.length) {
        movieGenres = response.data.genres;
      }

      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
}

/**
 * Gets a list of TV show genres.
 *
 * @returns {Promise<IMovieDbGenreList | null>} List of TV show genres.
 */
 const getTvShowGenres = async (): Promise<IMovieDbGenreList | null> => {
  if (tvShowGenres.length) {
    return {
      genres: tvShowGenres,
    };
  }

  try {
    const response =  await request.get(`/genre/tv/list`);

    if (response.status === 200) {
      if (!tvShowGenres.length) {
        tvShowGenres = response.data.genres;
      }

      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
}

export default {
  getMovieGenres,
  getTvShowGenres,
};
