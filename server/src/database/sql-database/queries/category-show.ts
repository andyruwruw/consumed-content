// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the CategoryShow table.
 */
export const CREATE_CATEGORY_SHOW_TABLE = `
CREATE TABLE IF NOT EXISTS CategoryShow (
  \`categoryId\` int(11) NOT NULL,
  \`showId\` int(11) NOT NULL,
  \`added\` int(11) DEFAULT(UNIX_TIMESTAMP()()),
  PRIMARY KEY (\`categoryId\`, \`showId\`),
  FOREIGN KEY (\`categoryId\`) REFERENCES \`Category\` (\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`showId\`) REFERENCES \`Shows\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the CategoryShow table.
 */
export const DROP_CATEGORY_SHOW_TABLE = `
DROP TABLE CategoryShow;
`;

/**
 * Deletes all rows.
 */
export const DELETE_ALL_ROWS = `
DELETE FROM CategoryShow;
`;

/**
 * Inserts a new category show.
 *
 * @param {number} categoryId Category's Id.
 * @param {number} showId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_CATEGORY_SHOW = (
  categoryId: number,
  showId: number,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO CategoryShow (categoryId, showId)
VALUES (:categoryId, :showId);`,
  },
  {
    categoryId,
    showId,
  },
]);

/**
 * Deletes a category show.
 *
 * @param {number} categoryId Category's Id.
 * @param {number} showId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const DELETE_CATEGORY_SHOW = (
  categoryId: number,
  showId: number,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
DELETE FROM CategoryShow
WHERE categoryId = \`:categoryId\` AND showId = \`:showId\`;`,
  },
  {
    categoryId,
    showId,
  },
]);

/**
 * Retrieves shows in a category.
 *
 * @param {number} categoryId Category's Id.
 */
export const SELECT_CATEGORY_SHOWS = (categoryId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT Shows.id, Shows.name, Shows.type, Shows.posterUrl, Shows.releaseDate, Shows.overview, CategorysShows.added
FROM (
  SELECT *
  FROM CategoryShow
  WHERE CategoryShow.categoryId = :categoryId
) as CategorysShows
JOIN Shows ON Shows.id = CategorysShows.showId;
`,
  },
  {
    categoryId,
  },
]);
