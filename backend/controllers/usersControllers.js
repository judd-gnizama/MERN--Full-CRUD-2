import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs'
import 'dotenv/config.js'
import jwt from 'jsonwebtoken'

// ------------------ CREATE JWT ---------------------------------
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" })
}

// ------------------ REGISTER USER ---------------------------------
const registerUser = async (req, res) => {
  // Grab data from request body
  const { email, password, username } = req.body;

  // check the fields
  if (!email || !password || !username) {
    return res.status(400).json({ error: "All fields are required"});
  }

  // check if email already exists
  const exist = await User.findOne({ email })
  if (exist) {
    return res.status(400).json({ error: "Email already taken"});
  }

  // check if username already exists
  const usernameExist = await User.findOne({ username })
  if (usernameExist) {
    return res.status(400).json({ error: "Username already taken"});
  }

  // Hash password before saving
  const salt = await bcrypt.genSalt()
  const hashed = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ email, password: hashed, username });
    const token = createToken(user._id)
    // send response
    res.status(200).json({ email, token, username })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};


// ------------------ LOGIN USER ---------------------------------
const loginUser = async (req, res) => {
  // Grab data from request body
  const { email, password } = req.body;

  // check the fields
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required"});
  }

  // check if email already exists
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ error: "Incorrect email"});
  }

  // check password
  const match = await bcrypt.compare(password, user.password)
  if(!match) {
    return res.status(400).json({ error: "Incorrect password"});
  }

  try {
    const token = createToken(user._id)
    const username = user.username
    console.log(username)
    res.status(200).json({ email, token, username })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};
export { registerUser, loginUser }