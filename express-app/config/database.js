const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'your-mariadb-host',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name',
  connectionLimit: 5
});

module.exports = pool;
