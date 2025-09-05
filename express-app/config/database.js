const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '3939',
  user: 'root',
  password: '1234',
  database: 'express',
  connectionLimit: 5
});

module.exports = pool;
