export const CREATE_GENRE_TABLE = `
CREATE TABLE IF NOT EXISTS Genre (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(64) NOT NULL,
  PRIMARY KEY (\`id\`)
);`;