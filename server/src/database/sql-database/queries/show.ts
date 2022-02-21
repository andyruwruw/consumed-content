export const CREATE_SHOW_TABLE = `
CREATE TABLE IF NOT EXISTS Shows (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(64) NOT NULL,
  \`showType\` varchar(64) NOT NULL,
  \`posterUrl\` varchar(255) NOT NULL,
  \`backdropUrl\` varchar(255) NOT NULL,
  \`releaseDate\` varchar(255) NOT NULL,
  \`overview\` text NOT NULL,
  PRIMARY KEY (\`id\`),
);`;

export const INSERT_SHOW = `INSERT INTO Show VALUE (:name, :type, :posterUrl, :backdropUrl, :releaseDate, :overview)`;
