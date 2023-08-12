import User from '../models/user.js';
import twilio from 'twilio';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } =
  process.env;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const getProfile = async (req, res) => {
  try {
    const userObj = await User.findOne({ username: req.user });

    if (!userObj) return res.status(404).json({ message: 'User not found!' });

    const user = {
      username: userObj.username,
      name: userObj.name,
      phoneNumber: userObj.phoneNumber,
      isPhoneNumberVerified: userObj.isPhoneNumberVerified,
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

    await User.findByIdAndUpdate(
      user._id,
      { $set: { phoneNumber, name } },
      { new: true }
    );

    if (user.phoneNumber !== phoneNumber) {
      await User.findByIdAndUpdate(
        user._id,
        { $set: { isPhoneNumberVerified: false } },
        { new: true }
      );
    }

    return res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};

export const sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
    console.log('OTP send successfully');
    res.status(200).json({ message: otpResponse.status });
  } catch (error) {
    console.log(`An error occurred ${error}`);
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user });

    await User.findByIdAndUpdate(
      user._id,
      { $set: { isPhoneNumberVerified: true } },
      { new: true }
    );

    const { phoneNumber, otp } = req.body;
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phoneNumber, code: otp });
    console.log('OTP verified successfully');
    res.status(200).json({ message: verifiedResponse.status });
  } catch (error) {
    console.log(`An error occurred ${error}`);
  }
};
