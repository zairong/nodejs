var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

// 基本測試端點
router.get('/hello', function(req, res, next) {
  res.json({ message: 'Hello from the API!' });
});

// 用戶 CRUD 路由
// CREATE - 創建新用戶
router.post('/users', userController.createUser);

// READ - 獲取所有用戶
router.get('/users', userController.listUsers);

// READ - 根據 ID 獲取單個用戶
router.get('/users/:id', userController.getUserById);

// UPDATE - 更新用戶
router.put('/users/:id', userController.updateUser);

// DELETE - 刪除用戶
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
