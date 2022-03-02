// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the ShowGenre table.
 */
export const CREATE_SHOW_GENRE_TABLE = `
CREATE TABLE IF NOT EXISTS ShowGenre (
  \`showId\` int(11) NOT NULL,
  \`genreId\` int(11) NOT NULL,
  PRIMARY KEY (\`showId\`, \`genreId\`),
  FOREIGN KEY (\`showId\`) REFERENCES \`Shows\` (\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`genreId\`) REFERENCES \`Genre\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;`;

/**
 * Deletes the ShowGenre table.
 */
export const DROP_SHOW_GENRE_TABLE = `
DROP TABLE ShowGenre;
`;

/**
 * Inserts a new show platform.
 *
 * @param {string} showId Show's Id.
 * @param {string} genreId Genre's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_SHOW_GENRE = (
  showId: string,
  genreId: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO ShowGenre (showId, genreId)
VALUES (:showId, :genreId);`,
  },
  {
    showId,
    genreId,
  },
]);
