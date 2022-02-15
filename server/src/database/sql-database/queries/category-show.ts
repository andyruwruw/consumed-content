export const CREATE_CATEGORY_SHOW_TABLE = `
CREATE TABLE IF NOT EXISTS CategoryShow (
  \`categoryId\` int(11) NOT NULL,
  \`showId\` int(11) NOT NULL,
  PRIMARY KEY (\`categoryId\`, \`showId\`),
  FOREIGN key (\`categoryId\`) REFERENCES \`Category\` (\`id\`),
  FOREIGN key (\`showId\`) REFERENCES \`Show\` (\`id\`)
);`;