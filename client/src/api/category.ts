// Local Imports
import request from './request';

// Types
import { ICategory, ICategoryShowObject, IUserCategoryObject } from '../../../shared/types';

export const getUserCategories = async (id: number): Promise<IUserCategoryObject[]> => {
  try {
    const response = await request.get('/get-user-categories', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data.categories as IUserCategoryObject[];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const create = async () => {
  try {
    await request.get('/create-category');
  } catch (error) {
    console.log(error);
  }
};

export const getShows = async (id: number) => {
  try {
    const response = await request.get('/get-category-shows', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data.shows as ICategoryShowObject[];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const getCategory = async (id: number) => {
  try {
    const response = await request.get('/get-category', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data.category as IUserCategoryObject;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const edit = async (
  id: number,
  name: string,
  description: string,
) => {
  try {
    const response = await request.get('/edit-category', {
      params: {
        id,
        name,
        description,
      },
    });

    if (response.status === 200) {
      return response.data.category as ICategory;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const deleteOne = async (
  id: number,
) => {
  try {
    const response = await request.get('/delete-category', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data.coimpleted;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const addShow = async (
  id: number,
  showId: number,
) => {
  try {
    await request.get('/add-show-to-category', {
      params: {
        id,
        showId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeShow = async (
  id: number,
  showId: number,
) => {
  try {
    await request.get('/remove-show-from-category', {
      params: {
        id,
        showId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  create,
  getUserCategories,
  getShows,
  getCategory,
  deleteOne,
  edit,
  addShow,
  removeShow,
};
