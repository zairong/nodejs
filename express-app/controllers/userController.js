const User = require('../models/user');

// 創建新用戶
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: '姓名和電子郵件為必填項目' });
    }

    const newUser = await User.createUser(name, email);
    res.status(201).json({
      message: '用戶創建成功',
      user: newUser
    });
  } catch (err) {
    console.error('創建用戶錯誤:', err);
    res.status(500).json({ error: '創建用戶時發生錯誤' });
  }
};

// 獲取所有用戶
exports.listUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json({
      message: '成功獲取用戶列表',
      users: users,
      count: users.length
    });
  } catch (err) {
    console.error('獲取用戶列表錯誤:', err);
    res.status(500).json({ error: '獲取用戶列表時發生錯誤' });
  }
};

// 根據 ID 獲取單個用戶
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.getUserById(id);
    
    if (!user) {
      return res.status(404).json({ error: '找不到該用戶' });
    }

    res.json({
      message: '成功獲取用戶資訊',
      user: user
    });
  } catch (err) {
    console.error('獲取用戶錯誤:', err);
    res.status(500).json({ error: '獲取用戶時發生錯誤' });
  }
};

// 更新用戶
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: '姓名和電子郵件為必填項目' });
    }

    const updatedUser = await User.updateUser(id, name, email);
    
    if (!updatedUser) {
      return res.status(404).json({ error: '找不到該用戶' });
    }

    res.json({
      message: '用戶更新成功',
      user: updatedUser
    });
  } catch (err) {
    console.error('更新用戶錯誤:', err);
    res.status(500).json({ error: '更新用戶時發生錯誤' });
  }
};

// 刪除用戶
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.deleteUser(id);
    
    if (!deletedUser) {
      return res.status(404).json({ error: '找不到該用戶' });
    }

    res.json({
      message: '用戶刪除成功',
      user: deletedUser
    });
  } catch (err) {
    console.error('刪除用戶錯誤:', err);
    res.status(500).json({ error: '刪除用戶時發生錯誤' });
  }
};
