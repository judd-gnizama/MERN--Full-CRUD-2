import express from 'express'
import { registerUser, loginUser } from '../controllers/usersControllers.js';

const router = express.Router(); // instead of creating another instance of app

// Register User
router.post('/', registerUser)
// Login User
router.post('/login', loginUser)

export { router as usersRoutes }