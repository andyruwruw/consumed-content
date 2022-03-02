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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;`;

/**
 * Deletes the UserToken table.
 */
export const DROP_USER_TOKEN_TABLE = `
DROP TABLE UserToken;
`;

/**
 * Inserts a new user token.
 *
 * @param {string} userId User's Id.
 * @param {string} token Login token.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_USER_TOKEN = (
  userId: string,
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
