export const CREATE_SHOW_GENRE_TABLE = `
CREATE TABLE IF NOT EXISTS ShowGenre (
  \`showId\` int(11) NOT NULL,
  \`genreId\` int(11) NOT NULL,
  PRIMARY KEY (\`showId\`, \`genreId\`),
  FOREIGN KEY (\`showId\`) REFERENCES \`Shows\` (\`id\`),
  FOREIGN KEY (\`genreId\`) REFERENCES \`Genre\` (\`id\`)
);`;

export const INSERT_SHOW_GENRE = `INSERT INTO ShowGenre VALUE (:showId, :genreId)`;
