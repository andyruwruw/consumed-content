// Local Imports
import request from './request';

// Types
import {
  IMovieDbMovieSimplified,
  IMovieDbPageObject,
  IMovieDbTvShowSimplified,
} from '../../types';

/**
 * Search for movies by query.
 *
 * @param {string} query The query to search.
 * @returns {Promise<IMovieDbPageObject<IMovieDbMovieSimplified> | null>} The search results.
 */
const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<IMovieDbPageObject<IMovieDbMovieSimplified> | null> => {
  try {
    const response =  await request.get('/search/movie', {
      params: {
        query,
        page,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
};

/**
 * Search for TV shows by query.
 *
 * @param {string} query The query to search.
 * @returns {Promise<IMovieDbPageObject<IMovieDbTvShowSimplified> | null>} The search results.
 */
const searchTvShows = async (
  query: string,
  page: number = 1,
): Promise<IMovieDbPageObject<IMovieDbTvShowSimplified> | null> => {
  try {
    const response =  await request.get('/search/tv', {
      params: {
        query,
        page,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
};

export default {
  searchMovies,
  searchTvShows,
};
