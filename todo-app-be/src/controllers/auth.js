dotenv.config();
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/user.js';
import { resetPasswordTemplate } from '../utill/reset-password-template.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, username, password, phoneNumber } = req.body;
    const existUser = await User.findOne({ username });

    if (existUser)
      return res
        .status(409) // conflict
        .json({ message: 'Username already exists' });

    //create jwt
    const accessToken = jwt.sign(
      { username: username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    );
    const refreshToken = jwt.sign(
      { username: username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    const user = new User({
      name,
      username,
      password,
      phoneNumber,
      refreshToken,
    });
    await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 3600000, // cookie will be expires after 1 day
    });

    res.json({ accessToken });
  } catch (error) {
    console.log(`An error occurred ${error}`);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!username || !password)
      return res
        .status(400) // bad Request
        .json({ message: 'Username and password are required' });

    if (!user) {
      return res.sendStatus(401); // unauthorized
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      //create jwt
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '60s' }
      );
      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      await User.findByIdAndUpdate(
        user._id,
        { $set: { refreshToken } },
        { new: true }
      );

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 3600000, // cookie will be expires after 1 day
      });
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(`An error occurred ${error}`);
  }
};

export const getAccessToken = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401); // unauthorized

    const refreshToken = cookies?.jwt;

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.sendStatus(403);
    }

    // evaluate jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.username !== decoded.username)
          return res.sendStatus(403);

        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '60s' }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(`An error occurred ${error}`);
  }
};

export const logoutUser = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); // no content

    const refreshToken = cookies?.jwt;

    //is refresh token in the db
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie('jwt', { httpOnly: true });
      return res.sendStatus(204);
    }

    // delete refresh token in the db
    await User.findByIdAndUpdate(
      user._id,
      { $set: { refreshToken: undefined } },
      { new: true }
    );
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log(`An error occurred ${error}`);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // generate a unique reset token and set an expiry date
    const resetToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });

    // store the reset token and expiry date in the user's document
    user.resetToken = resetToken;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Todo App ✔" ${process.env.USER_EMAIL}`, // sender address
      // to: username,
      to: 'yihonaj297@kkoup.com',
      subject: 'Password Reset Request', // Subject line
      html: resetPasswordTemplate(user.name, resetToken), // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        console.log('Message ID:', info.messageId);
        return res.status(200).json({
          message: 'Email sending successful',
        });
      }
    });
  } catch (error) {
    console.log(`An error occurred ${error}`);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const user = await User.findOne({
      resetToken,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired reset token' });
    }

    // Check if the reset token is not expired
    jwt.verify(resetToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(400)
          .json({ message: 'Invalid or expired reset token' });
    });

    // Update the user's password and reset token fields
    user.password = newPassword;
    user.resetToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.log(`An error occurred ${error}`);
  }
};
