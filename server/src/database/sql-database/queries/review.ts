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
  \`created\` DATETIME DEFAULT(GETDATE()),
  \`updated\` DATETIME DEFAULT(GETDATE()),
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
 * Create a new review.
 *
 * @param {string} showId Show the review is about.
 * @param {string} userId User posting the review.
 * @param {string} name Name of the review.
 * @param {number} rating Rating of the show.
 * @param {string} description Description of the show.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const INSERT_REVIEW = (
  showId: string,
  userId: string,
  name: string,
  rating: string,
  description: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
INSERT INTO Review (showId, userId, name, rating, description)
VALUE (:showId, :userId, :name, :rating, :description)
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
 * Gets reviews from a show.
 *
 * @param {string} showId Show the review is about.
 * @returns {IMariaDbQuery} MariaDB query.
 */
export const SELECT_REVIEWS_FROM_SHOW = (
  showId: string,
): IMariaDbQuery => ([
  {
    namedPlaceholders: true,
    sql:`
SELECT Review.showId, Review.userId, Review.name, Review.rating, Review.description, User.private FROM Review
WHERE showId = \":showId\"
INNER JOIN Users ON Review.userId = Users.id
    `,
  },
  {
    showId,
  },
]);
