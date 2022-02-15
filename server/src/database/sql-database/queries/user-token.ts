export const CREATE_USER_TOKEN_TABLE = `
CREATE TABLE IF NOT EXISTS UserToken (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`userId\` int(11) NOT NULL,
  \`token\` text NOT NULL,
  PRIMARY KEY (\`id\`),
  FOREIGN key (\`userId\`) REFERENCES \`User\` (\`id\`)
);`;