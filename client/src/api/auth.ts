// Local Imports
import request from './request';

// Types
import { IUser } from '../../../shared/types';

/**
 * Logs in a user.
 *
 * @param {string} username Username of the user.
 * @param {string} password Password of the user.
 * @returns {Promise<IUser | null>} User object.
 */
const login = async (
  username: string,
  password: string,
): Promise<IUser | null> => {
  try {
    const response = await request.get('/login', {
      params: {
        username,
        password,
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

const register = async (
  name: string,
  username: string,
  password: string,
): Promise<IUser | null> => {
  try {
    console.log('register');
  } catch (error) {
    return null;
  }
  return null;
};

const checkUser = async (): Promise<void> => {
  try {
    console.log('checkUser');
  } catch (error) {
    return;
  }
};

export default {
  login,
  register,
};
