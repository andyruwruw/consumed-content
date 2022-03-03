// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the Shows table.
 */
export const CREATE_SHOW_TABLE = `
CREATE TABLE IF NOT EXISTS Shows (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(64) NOT NULL,
  \`type\` varchar(64) NOT NULL,
  \`posterUrl\` varchar(255) NOT NULL,
  \`backdropUrl\` varchar(255) NOT NULL,
  \`releaseDate\` varchar(255) NOT NULL,
  \`overview\` text NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the Shows table.
 */
export const DROP_SHOW_TABLE = `
DROP TABLE Shows;
`;

/**
 * Deletes all rows.
 */
export const DELETE_ALL_ROWS = `
DELETE FROM Shows;
`;

/**
 * Inserts a new show.
 *
 * @param {string} name Name of the show.
 * @param {string} type Type, tv-show or movie
 * @param {string} posterUrl URL to poster image.
 * @param {string} backdropUrl URL to backdrop image.
 * @param {string} releaseDate Release date.
 * @param {string} overview Overview of the show.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_SHOW = (
  name: string,
  type: string,
  posterUrl: string,
  backdropUrl: string,
  releaseDate: string,
  overview: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO Shows (name, type, posterUrl, backdropUrl, releaseDate, overview)
VALUES (":name", ":type", ":posterUrl", ":backdropUrl", ":releaseDate", ":overview");`,
  },
  {
    name,
    type,
    posterUrl,
    backdropUrl,
    releaseDate,
    overview,
  },
]);

/**
 * Delete show by Id.
 *
 * @param {number} id Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const DELETE_SHOW = (id: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
DELETE FROM Shows
WHERE \`id\` = :id;`,
  },
  {
    id,
  },
]);

/**
 * Selects a show by Id.
 *
 * @param {number} id Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_SHOW = (id: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT *
FROM Shows
WHERE \`id\` = :id;`,
  },
  {
    id,
  },
]);
