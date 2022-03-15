// Local Imports
import request from './request';

// Types
import {
  IShow,
  IShowGenreObject,
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

    console.log(response);

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

const getPopularMovies = async (): Promise<IShow[]> => {
  try {
    const response = await request.get('/get-show-list', {
      params: {
        type: 'movie',
        list: 'popular',
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

const getTopRatedMovies = async (): Promise<IShow[]> => {
  try {
    const response = await request.get('/get-show-list', {
      params: {
        type: 'movie',
        list: 'top',
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

const getPopularTvShows = async (): Promise<IShow[]> => {
  try {
    const response = await request.get('/get-show-list', {
      params: {
        type: 'tv-show',
        list: 'popular',
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

const getTopRatedTvShows = async (): Promise<IShow[]> => {
  try {
    const response = await request.get('/get-show-list', {
      params: {
        type: 'tv-show',
        list: 'top',
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

const getShowGenres = async (id: number): Promise<IShowGenreObject[]> => {
  try {
    const response = await request.get('/get-show-genres', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data.genres as IShowGenreObject[];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

const get = async (id: number): Promise<IShow | null> => {
  try {
    const response = await request.get('/get-show', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data.show as IShow;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default {
  searchMovies,
  searchTvShows,
  add,
  remove,
  userShows,
  getPopularMovies,
  getTopRatedMovies,
  getPopularTvShows,
  getTopRatedTvShows,
  getShowGenres,
  get,
};
