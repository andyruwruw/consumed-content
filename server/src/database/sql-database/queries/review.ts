// Types
import { IMariaDbQuery } from '../../../types';

/**
 * Creates the Review table.
 */
export const CREATE_REVIEW_TABLE = `
CREATE TABLE IF NOT EXISTS Review (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`showId\` int(11) NOT NULL,
  \`userId\` int(11) NOT NULL,
  \`name\` varchar(64) NOT NULL,
  \`rating\` int(11) NOT NULL,
  \`description\` text NOT NULL,
  \`created\` int(11) DEFAULT(UNIX_TIMESTAMP()),
  \`updated\` int(11) DEFAULT(UNIX_TIMESTAMP()),
  PRIMARY KEY (\`id\`),
  FOREIGN KEY (\`showId\`) REFERENCES \`Shows\` (\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`userId\`) REFERENCES \`Users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
`;

/**
 * Deletes the Review table.
 */
export const DROP_REVIEW_TABLE = `
DROP TABLE Review;
`;

/**
 * Deletes all rows.
 */
export const DELETE_ALL_ROWS = `
DELETE FROM Review;
`;

/**
 * Create a new review.
 *
 * @param {number} showId Show the review is about.
 * @param {number} userId User posting the review.
 * @param {string} name Name of the review.
 * @param {number} rating Rating of the show.
 * @param {string} description Description of the show.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_REVIEW = (
  showId: number,
  userId: number,
  name: string,
  rating: number,
  description: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
INSERT INTO Review (showId, userId, name, rating, description)
VALUE (:showId, :userId, ":name", :rating, ":description")
    `,
  },
  {
    showId,
    userId,
    name,
    rating,
    description,
  },
]);

/**
 * Deletes a review.
 *
 * @param {number} id Review's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const DELETE_REVIEW = (id: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
DELETE FROM Review
WHERE \`id\` = :id;`,
  },
  {
    id,
  },
]);

/**
 * Edits a review.
 *
 * @param {number} id Review's Id.
 * @param {string} name Review's name.
 * @param {number} rating Review's rating.
 * @param {string} description Review's description.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const UPDATE_REVIEW = (
  id: number,
  name: string,
  rating: number,
  description: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
UPDATE Review
SET \`name\` = ":name", \`rating\` = :rating, \`description\` = ":description", \`updated\` = UNIX_TIMESTAMP()
WHERE \`id\` = :id;`,
  },
  {
    id,
    name,
    rating,
    description,
  },
]);

/**
 * Gets a review.
 *
 * @param {number} id Review's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
 export const SELECT_REVIEW = (id: number): IMariaDbQuery => ([
 {
   namedPlaceholders: true,
   sql:`
SELECT Review.showId, Review.userId, Review.name, Review.rating, Review.description, Review.created, Review.updated, Shows.name as showName, Shows.type, Shows.posterUrl, Shows.backdropUrl, Shows.releaseDate, Shows.overview, Users.username, Users.imageUrl, Users.private
FROM Review
WHERE \`userId\` = :userId AND \`showId\` = :showId
INNER JOIN Shows ON Review.showId = Shows.id
INNER JOIN Users ON Review.userId = Users.id`,
 },
 {
   id,
 },
]);

/**
 * Gets review for a show by a user.
 *
 * @param {number} userId User's Id.
 * @param {number} showId Show's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
 export const SELECT_USER_REVIEW = (
   userId: number,
   showId: number,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
SELECT Review.showId, Review.userId, Review.name, Review.rating, Review.description, Review.created, Review.updated, Shows.name as showName, Shows.type, Shows.posterUrl, Shows.backdropUrl, Shows.releaseDate, Shows.overview, Users.username, Users.imageUrl, Users.private
FROM Review
WHERE \`userId\` = :userId AND \`showId\` = :showId
INNER JOIN Shows ON Review.showId = Shows.id
INNER JOIN Users ON Review.userId = Users.id`,
  },
  {
    userId,
    showId,
  },
]);

/**
 * Gets reviews from a show.
 *
 * @param {number} userId User's Id.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_USERS_REVIEWS = (userId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
SELECT Review.showId, Review.userId, Review.name, Review.rating, Review.description, Review.created, Review.updated, Shows.name as showName, Shows.type, Shows.posterUrl, Shows.backdropUrl, Shows.releaseDate, Shows.overview, Users.username, Users.imageUrl, Users.private
FROM Review
WHERE \`userId\` = :userId
INNER JOIN Shows ON Review.showId = Shows.id
INNER JOIN Users ON Review.userId = Users.id
    `,
  },
  {
    userId,
  },
]);

/**
 * Gets reviews from a show.
 *
 * @param {number} showId Show the review is about.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_SHOWS_REVIEWS = (showId: number): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
SELECT Review.userId, Review.showId, Review.name, Review.rating, Review.description, Users.private, Users.username, Users.imageUrl
FROM Review
WHERE showId = :showId
INNER JOIN Users ON Review.userId = Users.id
    `,
  },
  {
    showId,
  },
]);
