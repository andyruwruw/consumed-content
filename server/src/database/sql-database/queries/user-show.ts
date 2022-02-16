export const CREATE_USER_SHOW_TABLE = `
CREATE TABLE IF NOT EXISTS UserShow (
  \`userId\` int(11) NOT NULL,
  \`showId\` int(11) NOT NULL,
  PRIMARY KEY (\`userId\`, \`showId\`),
  FOREIGN key (\`userId\`) REFERENCES \`User\` (\`id\`),
  FOREIGN key (\`showId\`) REFERENCES \`Show\` (\`id\`)
);`;

export const INSERT_USER_SHOW = `INSERT INTO UserShow VALUE (:userId, :showId)`;