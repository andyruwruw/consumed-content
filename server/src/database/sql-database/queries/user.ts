export const CREATE_SHOW_TABLE = `
CREATE TABLE IF NOT EXISTS Show (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(64) NOT NULL,
  \`username\` varchar(64) NOT NULL,
  \`password\` varchar(255) NOT NULL,
  \`salt\` varchar(255) NOT NULL,
  \`private\` boolean NOT NULL,
  \`imageUrl\` varchar(255) NOT NULL,
  PRIMARY KEY (\`id\`),
);`;