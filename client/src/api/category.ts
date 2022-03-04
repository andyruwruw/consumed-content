// Local Imports
import request from './request';

// Types
import { IUserCategoryObject } from '../../../shared/types';

export const getUserCategories = async (id: number): Promise<IUserCategoryObject[]> => {
  try {
    const response = await request.get('/get-user-categories', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data.reviews as IUserCategoryObject[];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

export default {
  getUserCategories,
};
