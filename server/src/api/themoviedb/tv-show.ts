// Local Imports
import request from './request';

// Types
import {
  IMovieDbPageObject,
  IMovieDbTvShow,
  IMovieDbTvShowCredits,
  IMovieDbTvShowSimplified,
} from '../../types';

/**
 * Gets a TV show by it's ID.
 *
 * @param {number} id The Movie DB TV show ID.
 * @returns {Promise<IMovieDbTvShow | null>} The TV show.
 */
const getTvShow = async (id: number): Promise<IMovieDbTvShow | null> => {
  try {
    const response =  await request.get(`/tv/${id}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
};

/**
 * Gets a TV show's credits.
 *
 * @param {number} id The Movie DB TV show ID.
 * @returns {Promise<IMovieDbTvShowCredits | null>} The TV show's credits.
 */
const getTvShowsCredits = async (id: number): Promise<IMovieDbTvShowCredits | null> => {
  try {
    const response =  await request.get(`/tv/${id}/credits`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
};

/**
 * Gets a list of the top rated TV shows.
 *
 * @returns {Promise<IMovieDbPageObject<IMovieDbTvShowSimplified> | null>} Top rated TV shows.
 */
const getTopRatedTvShows = async (): Promise<IMovieDbPageObject<IMovieDbTvShowSimplified> | null> => {
  try {
    const response =  await request.get('/tv/top_rated');

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
};

export default {
  getTvShow,
  getTvShowsCredits,
  getTopRatedTvShows,
};
