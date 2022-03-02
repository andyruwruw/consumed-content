// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the CategoryShow table.
 */
export const CREATE_CATEGORY_SHOW_TABLE = `
CREATE TABLE IF NOT EXISTS CategoryShow (
  \`categoryId\` int(11) NOT NULL,
  \`showId\` int(11) NOT NULL,
  \`added\` DATETIME DEFAULT(GETDATE()),
  PRIMARY KEY (\`categoryId\`, \`showId\`),
  FOREIGN KEY (\`categoryId\`) REFERENCES \`Category\` (\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`showId\`) REFERENCES \`Shows\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;`;

/**
 * Deletes the CategoryShow table.
 */
export const DROP_CATEGORY_TABLE = `
DROP TABLE CategoryShow;
`;

/**
 * Inserts a new category show.
 *
 * @param {string} categoryId Category's Id.
 * @param {string} showId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_CATEGORY_SHOW = (
  categoryId: string,
  showId: string,
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
