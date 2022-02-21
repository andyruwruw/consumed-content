export const CREATE_USER_FOLLOW_TABLE = `
CREATE TABLE IF NOT EXISTS UserFollow (
  \`userId\` int(11) NOT NULL,
  \`followingUserId\` int(11) NOT NULL,
  PRIMARY KEY (\`userId\`, \`followingUserId\`),
  FOREIGN key (\`userId\`) REFERENCES \`Users\` (\`id\`),
  FOREIGN key (\`followingUserId\`) REFERENCES \`Users\` (\`id\`)
);`;

export const INSERT_USER_FOLLOW = `INSERT INTO UserFollow VALUE (:userId, :followingUserId)`;