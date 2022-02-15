export const CREATE_SHOW_GENRE_TABLE = `
CREATE TABLE IF NOT EXISTS ShowGenre (
  \`showId\` int(11) NOT NULL,
  \`genreId\` int(11) NOT NULL,
  PRIMARY KEY (\`showId\`, \`genreId\`),
  FOREIGN key (\`showId\`) REFERENCES \`Show\` (\`id\`),
  FOREIGN key (\`genreId\`) REFERENCES \`Genre\` (\`id\`)
);`;