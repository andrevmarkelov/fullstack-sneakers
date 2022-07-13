const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'markelov',
  host: 'localhost',
  port: 5432,
  database: 'sneakers'
});

module.exports = pool;