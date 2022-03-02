// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the ShowPlatform table.
 */
export const CREATE_SHOW_PLATFORM_TABLE = `
CREATE TABLE IF NOT EXISTS ShowPlatform (
  \`showId\` int(11) NOT NULL,
  \`platformId\` int(11) NOT NULL,
  PRIMARY KEY (\`showId\`, \`platformId\`),
  FOREIGN KEY (\`showId\`) REFERENCES \`Shows\` (\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`platformId\`) REFERENCES \`Platform\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;`;

/**
 * Deletes the ShowPlatform table.
 */
export const DROP_SHOW_PLATFORM_TABLE = `
DROP TABLE ShowPlatform;
`;

/**
 * Inserts a new show platform.
 *
 * @param {string} showId Show's Id.
 * @param {string} platformId Platform's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_SHOW_PLATFORM = (
  showId: string,
  platformId: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO UserFollow (showId, platformId)
VALUES (:showId, :platformId);`,
  },
  {
    showId,
    platformId,
  },
]);
