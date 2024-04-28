import express from 'express'
import { addPost, deletePost, getPosts, getUserPosts, updatePost } from '../controllers/postsControllers.js';
import auth from '../middlewares/auth.js';

const router = express.Router(); // instead of creating another instance of app

// Get All Posts
router.get('/', getPosts)
// Get All Posts From a User
router.get('/user', auth, getUserPosts)
// Add New Post
router.post('/', auth, addPost)
// Delete Post
router.delete('/:id', auth, deletePost)
// Update Post
router.put('/:id', auth, updatePost)

export { router as postsRoutes }