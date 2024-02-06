
const { Pool, Client} = require('pg');

// Configuración de conexión a PostgreSQL
const client = new Client({
  allowExitOnIdle: true,
  user: 'postgres',
  host: 'localhost', // Reemplaza con la IP de tu contenedor de PostgreSQL
  database: 'TiendaFlowOg',
  password: '1234',
  port: 5432,
});

client.connect()

module.exports = { client };
