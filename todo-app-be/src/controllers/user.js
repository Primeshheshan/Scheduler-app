const User = require('../models/user');

exports.addUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = new User(username, password);
  user.save();
  res.sendStatus(201);
};
