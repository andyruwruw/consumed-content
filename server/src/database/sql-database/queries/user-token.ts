// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the UserToken table.
 */
export const CREATE_USER_TOKEN_TABLE = `
CREATE TABLE IF NOT EXISTS UserToken (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`userId\` int(11) NOT NULL,
  \`token\` text NOT NULL,
  PRIMARY KEY (\`id\`),
  FOREIGN KEY (\`userId\`) REFERENCES \`Users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the UserToken table.
 */
export const DROP_USER_TOKEN_TABLE = `
DROP TABLE UserToken;
`;

/**
 * Deletes all rows.
 */
export const DELETE_ALL_ROWS = `
DELETE FROM UserToken;
`;

/**
 * Inserts a new user token.
 *
 * @param {number} userId User's Id.
 * @param {string} token Login token.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_USER_TOKEN = (
  userId: number,
  token: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO UserToken (userId, token)
VALUES (:userId, :token);`,
  },
  {
    userId,
    token,
  },
]);

/**
 * Selects a UserToken based on userId and token values.
 *
 * @param {number} userId User's Id.
 * @param {string} token Login token.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_TOKEN = (
  userId: number,
  token: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT *
FROM UserToken
WHERE userId = :userId AND token = :token;`,
  },
  {
    userId,
    token,
  },
]);

/**
 * Deletes a UserToken by it's userId and token value.
 *
 * @param {number} userId User's Id.
 * @param {string} token Login token.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const DELETE_TOKEN = (
  userId: number,
  token: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
DELETE FROM UserToken
WHERE userId = :userId AND token = :token;`,
  },
  {
    userId,
    token,
  },
]);

/**
 * Deletes UserTokens for a userId.
 *
 * @param {number} userId User's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const DELETE_USERS_TOKENS = (userId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
DELETE FROM UserToken
WHERE userId = :userId;`,
  },
  {
    userId,
  },
]);
