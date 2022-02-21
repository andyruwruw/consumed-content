export const CREATE_CATEGORY_SHOW_TABLE = `
CREATE TABLE IF NOT EXISTS CategoryShow (
  \`categoryId\` int(11) NOT NULL,
  \`showId\` int(11) NOT NULL,
  PRIMARY KEY (\`categoryId\`, \`showId\`),
  FOREIGN KEY (\`categoryId\`) REFERENCES \`Category\` (\`id\`),
  FOREIGN KEY (\`showId\`) REFERENCES \`Shows\` (\`id\`)
);`;

export const INSERT_CATEGORY_SHOW = `INSERT INTO CategoryShow VALUE (:categoryId, :showId)`;
