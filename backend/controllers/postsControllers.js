import mongoose from 'mongoose';
import Post from '../models/PostModel.js';
import User from '../models/UserModel.js';

// ------------------ GET ALL POSTS ---------------------------------
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" })
    res.status(200).json( { posts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

// ------------- GET ALL POSTS FROM A USER ---------------------------------

const getUserPosts = async (req, res) => {

  // Grab authenticated user from request body
  const user = await User.findById(req.user._id)

  try {
    const userPosts = await Post.find({ user: user._id }).sort({ createdAt: "desc" });
    res.status(200).json( { userPosts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

// ------------------ CREATE NEW POST ---------------------------------
const addPost = async (req, res) => {

  // Grab data from request body
  const { title, body } = req.body;

  // check the fields
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required"});
  }

  // Grab authenticated user from request body
  const user = await User.findById(req.user._id)

  try {
    const post = await Post.create({ user: user._id, username: user.username, title, body });
    res.status(200).json({ success: "Post created", post})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

// ------------------ DELETE POST ---------------------------------
const deletePost = async (req, res) => {
  // Check Id type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID"});
  }
  // Check if post exists
  const post = await Post.findById(req.params.id)
  if (!post) {
    return res.status(400).json({ error: "Post not found"})
  }

  // Check if user owns the post
  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized"});
  }

  try {
    await post.deleteOne()
    res.status(200).json({ success: "Post deleted", post})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }

};

// ------------------ UPDATE POST ---------------------------------
const updatePost = async (req, res) => {
  // Grab data from request body
  const { title, body } = req.body;

  // check the fields
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required"});
  }

  // Check Id type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID"});
  }

  // Check if post exists
  const post = await Post.findById(req.params.id)
  if (!post) {
    return res.status(400).json({ error: "Post not found"})
  }

  // Check if user owns the post
  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized"});
  }

  try {
    await post.updateOne({ title, body })
    res.status(200).json({ success: "Post updated"})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }

  

};

export { getPosts, getUserPosts, addPost, deletePost, updatePost }