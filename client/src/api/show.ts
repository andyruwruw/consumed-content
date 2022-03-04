// Local Imports
import request from './request';

// Types
import {
  IShow,
  IUserShowObject,
} from '../../../shared/types';

const userShows = async (
  id: number,
  type: string,
): Promise<IUserShowObject[]> => {
  try {
    const response = await request.get('/get-user-shows', {
      params: {
        id,
        type,
      },
    });

    if (response.status === 200) {
      return response.data.shows as IUserShowObject[];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

const searchMovies = async (
  query: string,
  page: number,
): Promise<IShow[]> => {
  try {
    const response = await request.get('/search-movies', {
      params: {
        query,
        page,
      },
    });

    if (response.status === 200) {
      return response.data.shows as IShow[];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

const searchTvShows = async (
  query: string,
  page: number,
): Promise<IShow[]> => {
  try {
    const response = await request.get('/search-tv-shows', {
      params: {
        query,
        page,
      },
    });

    if (response.status === 200) {
      return response.data.shows as IShow[];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

const add = async (id: number): Promise<void> => {
  try {
    await request.get('/add-show', {
      params: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    await request.get('/remove-show', {
      params: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  searchMovies,
  searchTvShows,
  add,
  remove,
  userShows,
};
