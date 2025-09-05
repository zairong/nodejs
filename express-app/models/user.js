const pool = require('../config/database');

const User = {
  getAllUsers: async () => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM users');
      return rows;
    } finally {
      if (conn) conn.release();
    }
  }
};

module.exports = User;
