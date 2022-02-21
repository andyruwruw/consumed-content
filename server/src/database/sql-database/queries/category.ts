export const CREATE_CATEGORY_TABLE = `
CREATE TABLE IF NOT EXISTS Category (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`userId\` int(11) NOT NULL,
  \`name\` varchar(64) NOT NULL,
  PRIMARY KEY (\`id\`),
  FOREIGN KEY (\`userId\`) REFERENCES \`Users\` (\`id\`)
);`;

export const INSERT_CATEGORY = `INSERT INTO CategoryShow VALUE (:userId, :name)`;
