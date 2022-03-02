// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the UserFollow table.
 */
export const CREATE_USER_FOLLOW_TABLE = `
CREATE TABLE IF NOT EXISTS UserFollow (
  \`userId\` int(11) NOT NULL,
  \`followingUserId\` int(11) NOT NULL,
  PRIMARY KEY (\`userId\`, \`followingUserId\`),
  FOREIGN KEY (\`userId\`) REFERENCES \`Users\` (\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`followingUserId\`) REFERENCES \`Users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;`;

/**
 * Deletes the UserFollow table.
 */
export const DROP_USER_FOLLOW_TABLE = `
DROP TABLE UserFollow;
`;

/**
 * Inserts a new user follow.
 *
 * @param {string} userId User's Id.
 * @param {string} followingUserId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_USER_FOLLOW = (
  userId: string,
  followingUserId: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO UserFollow (userId, followingUserId)
VALUES (:userId, :followingUserId);`,
  },
  {
    userId,
    followingUserId,
  },
]);
