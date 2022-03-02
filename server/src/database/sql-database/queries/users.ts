// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the Users table.
 */
export const CREATE_USER_TABLE = `
CREATE OR REPLACE TABLE Users (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(64) NOT NULL,
  \`username\` varchar(64) NOT NULL,
  \`password\` varchar(255) NOT NULL,
  \`private\` boolean NOT NULL,
  \`imageUrl\` varchar(255) NOT NULL,
  \`joined\` DATETIME DEFAULT(GETDATE()),
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
 * Finds a User based off a username.
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
 * Finds a User based off a username. Projects only public information.
 *
 * @param {string} username User's username.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_PUBLIC_USER_BY_USERNAME = (username: string): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
SELECT name, username, private, imageUrl
FROM Users
WHERE username = :username;
    `,
  },
  {
    username,
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
INSERT INTO Users (name, username, pasword, privateMode, imageUrl)
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
