export const CREATE_PLATFORM_TABLE = `
CREATE TABLE IF NOT EXISTS Platform (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(64) NOT NULL,
  \`imageUrl\` varchar(255) NOT NULL,
  \`cost\` decimal(10,2) NOT NULL,
  PRIMARY KEY (\`id\`)
);`;