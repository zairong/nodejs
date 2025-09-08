const pool = require('../config/database');

const User = {
  // 創建新用戶
  createUser: async (name, email) => {
    try {
      const result = await pool.query(
        'INSERT INTO users (name, email, created_at) VALUES ($1, $2, NOW()) RETURNING *',
        [name, email]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // 獲取所有用戶
  getAllUsers: async () => {
    try {
      const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // 根據 ID 獲取單個用戶
  getUserById: async (id) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // 更新用戶
  updateUser: async (id, name, email) => {
    try {
      const result = await pool.query(
        'UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
        [name, email, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // 刪除用戶
  deleteUser: async (id) => {
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // 初始化資料庫
  initializeDatabase: async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
};

module.exports = User;
