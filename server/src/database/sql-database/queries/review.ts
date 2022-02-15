export const CREATE_REVIEW_TABLE = `
CREATE TABLE IF NOT EXISTS Review (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`showId\` int(11) NOT NULL,
  \`userId\` int(11) NOT NULL,
  \`name\` varchar(64) NOT NULL,
  \`rating\` int(11) NOT NULL,
  \`description\` text NOT NULL,
  PRIMARY KEY (\`id\`),
  FOREIGN KEY (\`showId\`) REFERENCES \`Show\` (\`id\`),
  FOREIGN KEY (\`userId\`) REFERENCES \`User\` (\`id\`)
);`;