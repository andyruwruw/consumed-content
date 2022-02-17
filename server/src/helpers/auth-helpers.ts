// Packages
import { VercelRequest } from '@vercel/node';
import bcrypt from 'bcrypt';

// Local Imports
import { SALT_WORK_FACTOR } from '../config';
import { Database } from '../database/database';
import {
  getCookie,
  decodeToken,
} from './cookie-helpers';

// Types
import {
  IUser,
  IUserToken,
} from '../../../shared/types';

/**
 * Salts and hashes passwords.
 *
 * @param {string} password Password to be salted and hashed.
 * @returns {Promise<string>} Hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  return await bcrypt.hash(
    password,
    salt,
  );
}

/**
 * Validates an incoming password against a vaild password.
 *
 * @param {string} valid Stored password.
 * @param {string} subject Password to test.
 * @returns {Promise<boolean>} Whether the passwords match.
 */
export const comparePassword = async (
  valid: string,
  subject: string,
): Promise<boolean> => {
  return await bcrypt.compare(
    subject,
    valid,
  );
}

/**
 * Validates a request and returns user.
 *
 * @param {VercelRequest} req Incoming request.
 * @param {Database} database Database instance.
 * @returns {Promise<IUser | null>} User if valid, null otherwise.
 */
export const validate = async (
  req: VercelRequest,
  database: Database,
): Promise<IUser | null> => {
  const cookie = getCookie(req);

  if (!cookie || cookie === '') {
    return null;
  }

  const {
    userId,
  } = decodeToken(cookie);

  if (!userId || userId === '') {
    return null;
  }

  const token = await database.userToken.findOne({
    userId: userId,
    token: cookie,
  }) as IUserToken | null;

  if (!token) {
    return null;
  }
  
  const user = await database.user.findOne({
    id: userId,
  }) as IUser | null;

  return user;
}
