// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the Users table.
 */
export const CREATE_USER_TABLE = `
CREATE TABLE IF NOT EXISTS Users (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(64) NOT NULL,
  \`username\` varchar(64) NOT NULL,
  \`password\` varchar(255) NOT NULL,
  \`private\` boolean NOT NULL,
  \`imageUrl\` varchar(255) NOT NULL,
  \`joined\` int(11) DEFAULT(UNIX_TIMESTAMP()),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the User table.
 */
export const DROP_USER_TABLE = `
DROP TABLE Users;
`;

/**
 * Deletes all rows.
 */
export const DELETE_ALL_ROWS = `
DELETE FROM Users;
`;

/**
 * Finds an User based off a username.
 *
 * @param {string} username User's username.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_PRIVATE_USER_BY_USERNAME = (username: string): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
SELECT *
FROM Users
WHERE username = :username;
    `,
  },
  {
    username,
  },
]);

/**
 * Finds an User based off a username. Projects only public information.
 *
 * @param {string} username User's username.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_PUBLIC_USER_BY_USERNAME = (username: string): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
SELECT id, name, username, private, imageUrl
FROM Users
WHERE username = :username;
    `,
  },
  {
    username,
  },
]);

/**
 * Finds an User based off a Id.
 *
 * @param {number} id User's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_PRIVATE_USER_BY_ID = (id: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
SELECT *
FROM Users
WHERE id = :id;
    `,
  },
  {
    id,
  },
]);

/**
 * Finds an User based off a Id. Projects only public information.
 *
 *  @param {number} id User's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_PUBLIC_USER_BY_ID = (id: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
SELECT id, name, username, private, imageUrl
FROM Users
WHERE id = :id;
    `,
  },
  {
    id,
  },
]);

/**
 * Inserts a new user. It's expected that the password has been hashed and
 * it's been checked to ensure that another user with the same username
 * doesn't already exist.
 *
 * @param {string} name User's name.
 * @param {string} username User's username.
 * @param {string} password User's password.
 * @param {boolean} privateMode User's privacy settings.
 * @param {string} imageUrl User's image.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_USER = (
  name: string,
  username: string,
  password: string,
  privateMode: boolean,
  imageUrl: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
INSERT INTO Users (name, username, password, private, imageUrl)
VALUES (:name, :username, :password, :private, :imageUrl);`,
  },
  {
    name,
    username,
    password,
    private: privateMode,
    imageUrl,
  },
]);

/**
 * Updates a user.
 *
 * @param {number} id User's Id.
 * @param {string} name User's name.
 * @param {string} username User's username.
 * @param {string} password User's password.
 * @param {boolean} privateMode User's privacy settings.
 * @param {string} imageUrl User's image.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const UPDATE_USER = (
  id: number,
  name: string,
  username: string,
  password: string,
  privateMode: boolean,
  imageUrl: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql: `
UPDATE users 
SET
    name = :name, 
    username = :username, 
    password = :password, 
    private = :private, 
    imageUrl = :imageUrl, 
    WHERE id = :id;`,
  },
  {
    id,
    name,
    username,
    password,
    private: privateMode,
    imageUrl,
  },
]);
