import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

const auth = async (req, res, next) => {
  // check if request headers have authorization header
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not found"});
  }

  // Grab token (remove prefix "bearer")
  const token = authorization.split(" ")[1];

  try {
    // Decode userid from token
    const { _id } = jwt.verify(token, process.env.SECRET)
    // Save the user in request
    req.user = await User.findById(_id).select("_id")
    // Go to handler
    next()
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

}
export default auth;