export const CREATE_SHOW_PLATFORM_TABLE = `
CREATE TABLE IF NOT EXISTS ShowPlatform (
  \`showId\` int(11) NOT NULL,
  \`platformId\` int(11) NOT NULL,
  PRIMARY KEY (\`showId\`, \`platformId\`),
  FOREIGN key (\`showId\`) REFERENCES \`Shows\` (\`id\`),
  FOREIGN key (\`platformId\`) REFERENCES \`Platform\` (\`id\`)
);`;

export const INSERT_SHOW_PLATFORM = `INSERT INTO ShowPlatform VALUE (:showId, :platformId)`;