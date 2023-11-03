const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'neo4j+s://3d32b423.databases.neo4j.io', // URL do banco de dados Neo4j online
  neo4j.auth.basic('neo4j', 'OWJn1NapdsRNvjT79PM56XYA6FLKqRnRJyO-jD6BCSo') // Credenciais de acesso
);

module.exports = driver;