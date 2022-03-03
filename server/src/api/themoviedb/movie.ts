// Local Imports
import request from './request';

// Types
import {
  IMovieDbMovie,
  IMovieDbMovieCredits,
  IMovieDbItemImages,
  IMovieDbPageObject,
  IMovieDbMovieSimplified,
} from '../../types';

/**
 * Gets a movie by it's ID.
 *
 * @param {number} id The Movie DB movie ID.
 * @returns {Promise<IMovieDbMovie | null>} The movie.
 */
const getMovie = async (id: number): Promise<IMovieDbMovie | null> => {
  try {
    const response =  await request.get(`/movie/${id}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
};

/**
 * Gets a movie's credits.
 *
 * @param {number} id The Movie DB movie ID.
 * @returns {Promise<IMovieDbMovieCredits | null>} The movie's credits.
 */
const getMoviesCredits = async (id: number): Promise<IMovieDbMovieCredits | null> => {
  try {
    const response =  await request.get(`/movie/${id}/credits`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
};

/**
 * Gets a movie's images.
 *
 * @param {number} id The Movie DB movie ID.
 * @returns {Promise<IMovieDbMovie | null>} The movie's images.
 */
const getMoviesImages = async (id: number): Promise<IMovieDbItemImages | null> => {
  try {
    const response =  await request.get(`/movie/${id}/images`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
};

/**
 * Gets a list of the top rated movies.
 *
 * @returns {Promise<IMovieDbPageObject<IMovieDbMovieSimplified> | null>} Top rated movies.
 */
const getTopRatedMovies = async (): Promise<IMovieDbPageObject<IMovieDbMovieSimplified> | null> => {
  try {
    const response =  await request.get('/movie/top_rated');

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
};

export default {
  getMovie,
  getMoviesCredits,
  getMoviesImages,
  getTopRatedMovies,
};
