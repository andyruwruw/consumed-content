// Local Imports
import request from './request';

// Types
import { IUserReviewObject } from '../../../shared/types';
import { IShowReviewRequestResponse } from '@/types';

const create = async (
  showId: number,
  name: string,
  rating: number,
  description: string,
): Promise<IUserReviewObject | null> => {
  try {
    const response = await request.get('/create-review', {
      params: {
        showId,
        name,
        rating,
        description,
      },
    });

    if (response.status === 200) {
      return response.data.review as IUserReviewObject;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const deleteOne = async (id: number): Promise<void> => {
  try {
    await request.get('/delete-review', {
      params: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const edit = async (
  id: number,
  name: string,
  rating: number,
  description: string,
): Promise<IUserReviewObject | null> => {
  try {
    const response = await request.get('/edit-review', {
      params: {
        id,
        name,
        rating,
        description,
      },
    });

    if (response.status === 200) {
      return response.data.review as IUserReviewObject;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getShowReviews = async (id: number): Promise<IShowReviewRequestResponse | null> => {
  try {
    const response = await request.get('/get-show-reviews', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data as IShowReviewRequestResponse;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getUserReviews = async (id: number): Promise<IUserReviewObject[]> => {
  try {
    const response = await request.get('/get-user-reviews', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data.reviews as IUserReviewObject[];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}

export default {
  create,
  deleteOne,
  edit,
  getShowReviews,
  getUserReviews,
};
