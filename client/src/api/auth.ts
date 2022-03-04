// Local Imports
import request from './request';

// Types
import { IPublicUserObject } from '../../../shared/types';

/**
 * Logs in a user.
 *
 * @param {string} username Username of the user.
 * @param {string} password Password of the user.
 * @returns {Promise<IPublicUserObject | null>} User object.
 */
const login = async (
  username: string,
  password: string,
): Promise<IPublicUserObject | null> => {
  try {
    const response = await request.get('/login', {
      params: {
        username,
        password,
      },
    });

    if (response.status === 200) {
      return response.data.user;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const register = async (
  name: string,
  username: string,
  password: string,
): Promise<IPublicUserObject | null> => {
  try {
    const response = await request.get('/register', {
      params: {
        name,
        username,
        password,
      },
    });

    if (response.status === 200) {
      return response.data.user;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const checkUser = async (): Promise<IPublicUserObject | null> => {
  try {
    const response = await request.get('/check-user');

    if (response.status === 200) {
      return response.data.user;
    } else if (response.status === 204) {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default {
  login,
  register,
  checkUser,
};
