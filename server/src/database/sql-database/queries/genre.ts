// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the Genre table.
 */
export const CREATE_GENRE_TABLE = `
CREATE TABLE IF NOT EXISTS Genre (
  \`id\` int(11) NOT NULL,
  \`name\` varchar(64) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the Genre table.
 */
export const DROP_GENRE_TABLE = `
DROP TABLE Genre;
`;

/**
 * Inserts a new genre.
 *
 * @param {number} id Genre's id. The Movies DB provides an ID, so we need to hard set this.
 * @param {string} name Genre's name.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_GENRE = (
  id: number,
  name: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO Genre (id, name)
VALUES (:id, :name);`,
  },
  {
    id,
    name,
  },
]);
