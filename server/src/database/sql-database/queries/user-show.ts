// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the UserShow table.
 */
export const CREATE_USER_SHOW_TABLE = `
CREATE TABLE IF NOT EXISTS UserShow (
  \`userId\` int(11) NOT NULL,
  \`showId\` int(11) NOT NULL,
  \`added\` int(11) DEFAULT(UNIX_TIMESTAMP()),
  PRIMARY KEY (\`userId\`, \`showId\`),
  FOREIGN KEY (\`userId\`) REFERENCES \`Users\` (\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`showId\`) REFERENCES \`Shows\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the UserShow table.
 */
export const DROP_USER_SHOW_TABLE = `
DROP TABLE UserShow;
`;

/**
 * Deletes all rows.
 */
export const DELETE_ALL_ROWS = `
DELETE FROM UserShow;
`;

/**
 * Selects a user show.
 *
 * @param {number} userId User's Id.
 * @param {number} showId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
 export const SELECT_USER_SHOW = (
   userId: number,
   showId: number
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT UserShow.added, Shows.name, Shows.type, Shows.posterUrl, Shows.backdropUrl, Shows.releaseDate, Shows.overview
FROM UserShow
WHERE userId = :userId AND showId = :showId
LEFT JOIN Shows ON UserShow.showId = Show.id;`,
  },
  {
    userId,
    showId,
  },
]);

/**
 * Selects all shows added by a user.
 *
 * @param {number} userId User's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_USERS_SHOWS = (userId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT UserShow.added, Shows.name, Shows.type, Shows.posterUrl, Shows.backdropUrl, Shows.releaseDate, Shows.overview
FROM UserShow
JOIN Shows ON UserShow.showId = Shows.id
WHERE userId = :userId;`,
  },
  {
    userId,
  },
]);

/**
 * Unadds a show for a user.
 *
 * @param {number} userId User's Id.
 * @param {number} showId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const DELETE_USERS_SHOW = (
  userId: number,
  showId: number,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
DELETE FROM UserShow
WHERE userId = :userId AND showId = :showId;`,
  },
  {
    userId,
    showId,
  },
]);

/**
 * Selects all movies added by a user.
 *
 * @param {number} userId User's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_USERS_MOVIES = (userId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
    SELECT UserShow.added, Shows.name, Shows.type, Shows.posterUrl, Shows.backdropUrl, Shows.releaseDate, Shows.overview
    FROM UserShow
    LEFT JOIN shows ON UserShow.showId = Shows.id
    WHERE userId = :userId and shows.type = 'movie';`,
  },
  {
    userId,
  },
]);

/**
 * Selects all TV Shows added by a user.
 *
 * @param {number} userId User's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_USERS_TV_SHOWS = (userId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
    SELECT UserShow.added, Shows.name, Shows.type, Shows.posterUrl, Shows.backdropUrl, Shows.releaseDate, Shows.overview
    FROM UserShow
    LEFT JOIN shows ON UserShow.showId = Shows.id
    WHERE userId = :userId and shows.type = 'tv-show';`,
  },
  {
    userId,
  },
]);

/**
 * Selects all users who have adde the TV show.
 *
 * @param {number} showId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_SHOW_USERS = (showId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
    SELECT UserShow.added, UserShow.userId, Users.userName, Users.imageUrl
    FROM UserShow
    JOIN Users ON UserShow.userId = Users.id
    WHERE :userId = 4
    and :showId = 5 
    and Users.private = 0;`,
  },
  {
    showId,
  },
]);

/**
 * Inserts a new user show.
 *
 * @param {number} userId User's Id.
 * @param {number} showId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_USER_SHOW = (
  userId: number,
  showId: number,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO UserShow (userId, showId)
VALUES (:userId, :showId);`,
  },
  {
    userId,
    showId,
  },
]);
