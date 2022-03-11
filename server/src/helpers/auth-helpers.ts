// Packages
import { VercelRequest } from '@vercel/node';
import * as bcrypt from 'bcrypt';

// Local Imports
import {
  getCookie,
  decodeToken,
} from './cookie-helpers';
import { SALT_WORK_FACTOR } from '../config';
import { Database } from '../database/database';

// Types
import { Request } from 'express';
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
 * @param {VercelRequest | Request} req Incoming request.
 * @param {Database} database Database instance.
 * @returns {Promise<IPublicUserObject | null>} User if valid, null otherwise.
 */
export const validate = async (
  req: VercelRequest | Request,
  database: Database,
): Promise<IPublicUserObject | null> => {
  const cookie = getCookie(req);

  if (!cookie || cookie === '') {
    return null;
  }

  const token = decodeToken(cookie);

  const {
    id,
  } = token;

  if (!id || id === '') {
    return null;
  }

  if (!await database.userToken.validate(
    id,
    cookie,
  )) {
    return null;
  }

  const user = await database.user.getUser(id);

  return user;
};
