const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const findUserByEmail = await User.findOne({ "email": email });
    if (findUserByEmail) return res.status(403).send({ status: "failure", message: "The user already exists with the given email" });

    const findUserByUsername = await User.findOne({ "username": username });
    if (findUserByUsername) return res.status(403).send({ status: "failure", message: "The user already exists with the given username" });

    // generating encrypted password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('yha agya');
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log('yha agya 2');

    // save user and respond
    // const saveUser = await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send({ err });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User Not Found");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(400).json("Wrong Password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  registerUser,
  loginUser
};