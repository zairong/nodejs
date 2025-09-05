const User = require('../models/user');

exports.listUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error retrieving users');
  }
};
