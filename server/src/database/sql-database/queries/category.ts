// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the Category table.
 */
export const CREATE_CATEGORY_TABLE = `
CREATE TABLE IF NOT EXISTS Category (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`userId\` int(11) NOT NULL,
  \`name\` varchar(64) NOT NULL,
  \`description\` varchar(255) DEFAULT(""),
  \`created\` bigint unsigned DEFAULT(UNIX_TIMESTAMP()),
  PRIMARY KEY (\`id\`),
  FOREIGN KEY (\`userId\`) REFERENCES \`Users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the Category table.
 */
export const DROP_CATEGORY_TABLE = `
DROP TABLE Category;
`;

/**
 * Deletes all rows.
 */
export const DELETE_ALL_ROWS = `
DELETE FROM Category;
`;

/**
 * Inserts a new category.
 *
 * @param {number} userId User's Id.
 * @param {string} name Categories name.
 * @param {string} description Categories description.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_CATEGORY = (
  userId: number,
  name: string,
  description = '',
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO Category (userId, name, description)
VALUES (:userId, :name, :description);`,
  },
  {
    userId,
    name,
    description,
  },
]);

/**
 * Updates a category
 *
 * @param {number} id Category's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const UPDATE_CATEGORY = (
  id: number,
  name: string,
  description: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
UPDATE Category
SET \`name\` = :name, \`description\` = :description
WHERE \`id\` = :id;`,
  },
  {
    id,
    name,
    description,
  },
]);

/**
 * Deletes a category.
 *
 * @param {number} id Category's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const DELETE_CATEGORY = (id: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
DELETE FROM Category
WHERE \`id\` = :id;`,
  },
  {
    id,
  },
]);

/**
 * Selects a category
 *
 * @param {number} id Category's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_CATEGORY = (id: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT *
FROM Category
WHERE \`id\` = :id;`,
  },
  {
    id,
  },
]);

/**
 * Selects all a user's categories.
 *
 * @param {number} userId User's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_USER_CATEGORIES = (userId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
    SELECT Category.id, Category.userId, Category.name, Category.description, Category.created, Users.username, Users.imageUrl, Users.private
    FROM Category
    JOIN Users ON Category.userId = Users.id
    WHERE Category.userId = :userId
    ORDER BY Category.name ASC;`,
  },
  {
    userId,
  },
]);
