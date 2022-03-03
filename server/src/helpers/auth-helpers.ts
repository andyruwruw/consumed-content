// Packages
import { VercelRequest } from '@vercel/node';
import bcrypt from 'bcrypt';

// Local Imports
import {
  getCookie,
  decodeToken,
} from './cookie-helpers';
import { SALT_WORK_FACTOR } from '../config';
import { Database } from '../database/database';

// Types
import { IPublicUserObject } from '../../../shared/types';

/**
 * Salts and hashes passwords.
 *
 * @param {string} password Password to be salted and hashed.
 * @returns {Promise<string>} Hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  return bcrypt.hash(
    password,
    salt,
  );
};

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
  return bcrypt.compare(
    subject,
    valid,
  );
};

/**
 * Validates a request and returns user.
 *
 * @param {VercelRequest} req Incoming request.
 * @param {Database} database Database instance.
 * @returns {Promise<IPublicUserObject | null>} User if valid, null otherwise.
 */
export const validate = async (
  req: VercelRequest,
  database: Database,
): Promise<IPublicUserObject | null> => {
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

  if (!await database.userToken.validate(
    userId,
    cookie,
  )) {
    return null;
  }

  const user = await database.user.getUser(userId);

  return user;
};
