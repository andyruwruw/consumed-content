// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the Platform table.
 */
export const CREATE_PLATFORM_TABLE = `
CREATE TABLE IF NOT EXISTS Platform (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(64) NOT NULL,
  \`imageUrl\` varchar(255) NOT NULL,
  \`cost\` decimal(10,2) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the Platform table.
 */
export const DROP_PLATFORM_TABLE = `
DROP TABLE Platform;
`;

/**
 * Deletes all rows.
 */
export const DELETE_ALL_ROWS = `
DELETE FROM Platform;
`;

/**
 * Deletes a platform.
 *
 * @param {number} id Platform's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const DELETE_PLATFORM = (id: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
DELETE FROM Platform
WHERE \`id\` = :id;`,
  },
  {
    id,
  },
]);

/**
 * Updates a platform.
 *
 * @param {number} id Platform's Id.
 * @param {string} name Platform's name.
 * @param {string} imageUrl Platform's image url.
 * @param {number} cost Platform's cost.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const UPDATE_PLATFORM = (
  id: number,
  name: string,
  imageUrl: string,
  cost: number,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
UPDATE Platform
SET \`name\` = ":name", \`imageUrl\` = ":imageUrl", \`cost\` = :cost
WHERE \`id\` = :id;`,
  },
  {
    id,
    name,
    imageUrl,
    cost,
  },
]);

/**
 * Inserts a new platform.
 *
 * @param {string} name Platform's name.
 * @param {string} imageUrl Icon for the platform.
 * @param {number} cost Monthly cost.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_PLATFORM = (
  name: string,
  imageUrl: string,
  cost: number,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO Platform (name, imageUrl, cost)
VALUES (":name", ":imageUrl", :cost);`,
  },
  {
    name,
    imageUrl,
    cost,
  },
]);
