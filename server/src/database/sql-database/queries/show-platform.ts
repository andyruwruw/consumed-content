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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the ShowPlatform table.
 */
export const DROP_SHOW_PLATFORM_TABLE = `
DROP TABLE ShowPlatform;
`;

/**
 * Deletes all rows.
 */
export const DELETE_ALL_ROWS = `
DELETE FROM ShowPlatform;
`;

/**
 * Remove a show platform.
 *
 * @param {number} showId Show's Id.
 * @param {number} platformId Platform's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const DELETE_SHOW_PLATFORM = (
  showId: number,
  platformId: number,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
DELETE FROM ShowPlatform
WHERE \`showId\` = :showId AND \`platformId\` = :platformId;`,
  },
  {
    showId,
    platformId,
  },
]);

/**
 * Selects a Show's platform.
 *
 * @param {number} showId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_SHOWS_PLATFORMS = (showId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT ShowPlatform.platformId, Platform.name, Platform.imageUrl, Platform.cost
FROM ShowPlatform
WHERE \`showId\` = :showId
LEFT JOIN Platform ON ShowPlatform.platformId = Platform.id;`,
  },
  {
    showId,
  },
]);

/**
 * Selects a Platforms Shows.
 *
 * @param {number} platformId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_PLATFORMS_SHOWS = (platformId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT ShowPlatform.showId, Shows.name, Shows.type, Shows.posterUrl, Shows.backdropUrl, Shows.releaseDate, Shows.overview
FROM ShowPlatform
WHERE \`platformId\` = :platformId
LEFT JOIN Shows ON ShowPlatform.showId = Show.id;`,
  },
  {
    platformId,
  },
]);

/**
 * Inserts a new show platform.
 *
 * @param {number} showId Show's Id.
 * @param {number} platformId Platform's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_SHOW_PLATFORM = (
  showId: number,
  platformId: number,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO ShowPlatform (showId, platformId)
VALUES (:showId, :platformId);`,
  },
  {
    showId,
    platformId,
  },
]);

/**
 * Selects a show platform.
 *
 * @param {number} showId Show's Id.
 * @param {number} platformId Platform's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_SHOW_PLATFORM = (
  showId: number,
  platformId: number,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT *
FROM ShowPlatform
WHERE \`showId\` = :showId AND \`platformId\` = :platformId;`,
  },
  {
    showId,
    platformId,
  },
]);