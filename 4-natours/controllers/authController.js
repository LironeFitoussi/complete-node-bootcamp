const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// const express = require('express');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) check if email and password exist
    if (!email || !password) {
      throw new Error('Please provide an email and password');
    }

    // 2) check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error('wrong password or user');
    }

    // 3) create token
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) get the token and check if there is one
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new Error('No token provided');
    }

    // 2) if there is, check if the token is valid
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) if there is a token, check if the user exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      throw new Error('User not found');
    }

    // console.log(decoded);
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: error.message,
    });
  }

  // 4) if user changes password after login, the token is invalid
  next();
};
