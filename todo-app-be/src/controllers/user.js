import User from '../models/user.js';

export const getProfile = async (req, res) => {
  try {
    const userObj = await User.findOne({ username: req.user });

    if (!userObj) return res.status(404).json({ message: 'User not found!' });

    const user = {
      username: userObj.username,
      name: userObj.name,
      phoneNumber: userObj.phoneNumber,
    };

    return res.status(200).json({
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user });
    const { phoneNumber, name } = req.body;

    if (!user) return res.status(404).json({ message: 'User not found!' });

    const updatedItem = await User.findByIdAndUpdate(
      user._id,
      { $set: { phoneNumber, name } },
      { new: true }
    );

    return res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};
