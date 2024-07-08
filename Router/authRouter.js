import express from "express"
import  { getAllUsers, getAuthUser, loginUser, registerUser, updateUser } from '../Controller/authController.js' 
import asyncMiddleware from "../middleware/Error.js";
import { authorization } from "../middleware/authorization.js";





const router = express.Router();

router.post('/signup',asyncMiddleware(registerUser))
router.post('/signin', asyncMiddleware(loginUser))
router.get('/profile',authorization,asyncMiddleware(getAuthUser))
router.get('/users',authorization ,asyncMiddleware(getAllUsers))
router.put('/profile',authorization,asyncMiddleware(updateUser))





export default router