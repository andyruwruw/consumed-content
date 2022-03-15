// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the ShowGenre table.
 */
export const CREATE_SHOW_GENRE_TABLE = `
CREATE TABLE IF NOT EXISTS ShowGenre (
  \`showId\` int(11) NOT NULL,
  \`genreId\` int(14) NOT NULL,
  PRIMARY KEY (\`showId\`, \`genreId\`),
  FOREIGN KEY (\`showId\`) REFERENCES \`Shows\` (\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`genreId\`) REFERENCES \`Genre\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the ShowGenre table.
 */
export const DROP_SHOW_GENRE_TABLE = `
DROP TABLE ShowGenre;
`;

/**
 * Deletes all rows.
 */
export const DELETE_ALL_ROWS = `
DELETE FROM ShowGenre;
`;

/**
 * Selects a shows genres.
 *
 * @param {number} showId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_SHOWS_GENRES = (showId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT ShowGenre.genreId, Genre.name
FROM Shows
JOIN ShowGenre ON shows.id = ShowGenre.showId 
JOIN Genre ON ShowGenre.genreId = Genre.id
WHERE showId = :showId;`,
  },
  {
    showId,
  },
]);

/**
 * Selects a genres shows.
 *
 * @param {number} genreId Genre's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_GENRES_SHOWS = (genreId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT ShowGenre.showId, Shows.name, Shows.type, Shows.posterUrl, Shows.backdropUrl, Shows.releaseDate, Shows.overview
FROM ShowGenre
JOIN Shows ON ShowGenre.showId = Shows.id
WHERE genreId = :genreId;`,
  },
  {
    genreId,
  },
]);

/**
 * Inserts a new show platform.
 *
 * @param {number} showId Show's Id.
 * @param {number} genreId Genre's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_SHOW_GENRE = (
  showId: number,
  genreId: number,
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
