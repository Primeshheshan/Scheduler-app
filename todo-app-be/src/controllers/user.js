import User from '../models/user.js';

export const registerUser = async (req, res) => {
  try {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const user = new User({ username, password });
    await user.save();
    console.log('A user created!');
    res.sendStatus(201);
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};
export const loginUser = async (req, res) => {
  try {
    console.log('A user logged!');
    res.sendStatus(201);
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};
