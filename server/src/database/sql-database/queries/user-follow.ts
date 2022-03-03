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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the UserFollow table.
 */
export const DROP_USER_FOLLOW_TABLE = `
DROP TABLE UserFollow;
`;

/**
 * Deletes all rows.
 */
export const DELETE_ALL_ROWS = `
DELETE FROM UserFollow;
`;

/**
 * Inserts a new user follow.
 *
 * @param {number} userId User's Id.
 * @param {number} followingUserId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_USER_FOLLOW = (
  userId: number,
  followingUserId: number,
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

/**
 * Removes a new user follow.
 *
 * @param {number} userId User's Id.
 * @param {number} followingUserId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const DELETE_USER_FOLLOW = (
  userId: number,
  followingUserId: number,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
DELETE FROM UserFollow
WHERE \`userId\` = :userId AND \`followingUserId\` = :followingUserId;`,
  },
  {
    userId,
    followingUserId,
  },
]);

/**
 * Retrieves Users a User is following.
 *
 * @param {number} userId User's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_USER_FOLLOWINGS = (userId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT User.id, User.username, User.imageUrl
FROM UserFollow
WHERE \`userId\` = :userId
LEFT JOIN User ON UserFollow.followingUserId = User.id;`,
  },
  {
    userId,
  },
]);

/**
 * Retrieves User's followers.
 *
 * @param {number} followingUserId User's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_USER_FOLLOWERS = (followingUserId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT User.id, User.username, User.imageUrl
FROM UserFollow
WHERE \`followingUserId\` = :followingUserId
LEFT JOIN User ON UserFollow.userId = User.id;`,
  },
  {
    followingUserId,
  },
]);
