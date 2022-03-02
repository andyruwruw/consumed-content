// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the UserShow table.
 */
export const CREATE_USER_SHOW_TABLE = `
CREATE TABLE IF NOT EXISTS UserShow (
  \`userId\` int(11) NOT NULL,
  \`showId\` int(11) NOT NULL,
  \`added\` DATETIME DEFAULT(GETDATE()),
  PRIMARY KEY (\`userId\`, \`showId\`),
  FOREIGN KEY (\`userId\`) REFERENCES \`Users\` (\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`showId\`) REFERENCES \`Shows\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;`;

/**
 * Deletes the UserShow table.
 */
export const DROP_USER_SHOW_TABLE = `
DROP TABLE UserShow;
`;

/**
 * Inserts a new user show.
 *
 * @param {string} userId User's Id.
 * @param {string} showId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_USER_SHOW = (
  userId: string,
  showId: string,
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
