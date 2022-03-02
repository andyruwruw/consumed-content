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
  \`created\` DATETIME DEFAULT(GETDATE()),
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
 * Inserts a new category.
 *
 * @param {string} userId User's Id.
 * @param {string} name Categories name.
 * @param {string} description Categories description.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_CATEGORY = (
  userId: string,
  name: string,
  description = '',
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO CategoryShow (userId, name, description)
VALUES (:userId, :name, :description);`,
  },
  {
    userId,
    name,
    description,
  },
]);

/**
 * Selects all a user's categories.
 *
 * @param {string} userId User's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
 export const SELECT_USER_CATEGORIES = (
  userId: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
SELECT *
FROM Category
WHERE Category.userId = :userId;
ORDER BY name ASC;`,
  },
  {
    userId,
  },
]);
