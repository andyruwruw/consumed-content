// Local Imports
import request from './request';

// Types
import {
  IPublicUserObject,
  IUserFollowObject,
} from '../../../shared/types';

const follow = async (id: number): Promise<void> => {
  try {
    await request.get('/follow', {
      params: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const unfollow = async (id: number): Promise<void> => {
  try {
    await request.get('/unfollow', {
      params: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const followers = async (id: number): Promise<IUserFollowObject[]> => {
  try {
    const response = await request.get('/get-user-followers', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data.users as IUserFollowObject[];
    }
  } catch (error) {
    console.log(error);
  }

  return [];
};

const following = async (id: number): Promise<IUserFollowObject[]> => {
  try {
    const response = await request.get('/get-user-following', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data.users as IUserFollowObject[];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

const get = async (id: number): Promise<IPublicUserObject | null> => {
  try {
    const response = await request.get('/get-user', {
      params: {
        id,
      },
    });

    if (response.status === 200) {
      return response.data.user as IPublicUserObject;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const update = async (
  name: string,
  imageUrl: string,
  privateMode: boolean,
): Promise<IPublicUserObject | null> => {
  try {
    const response = await request.get('/edit-user', {
      params: {
        name,
        imageUrl,
        privateMode,
      },
    });

    if (response.status === 200) {
      return response.data.user as IPublicUserObject;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export default {
  follow,
  unfollow,
  get,
  following,
  followers,
  update,
};
