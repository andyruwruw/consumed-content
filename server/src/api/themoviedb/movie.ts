// Local Imports
import request from './request';

// Types
import { IMovieDbMovie } from '../../types';

/**
 * Gets a movie by it's ID.
 *
 * @param {number} id The Movie DB movie ID.
 * @returns {Promise<IMovieDbMovie | null>} The movie.
 */
const getMovie = async (id: number): Promise<IMovieDbMovie | null> => {
  try {
    const response =  await request.get(`movie/${id}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
  return null;
}

export default {
  getMovie,
};
