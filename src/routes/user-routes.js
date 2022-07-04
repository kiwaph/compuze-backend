import express from "express";
import { getUserItems } from "../controllers/item-controller.js";
import { login, signUp, getUser, patchUser } from "../controllers/user-controller.js";
import { checkAuth } from "../middleware/auth.js";
import { validateSignup, validateLogin, validateEdit } from "../middleware/validation/user-validation.js";

export const userRoutes = express.Router();

userRoutes.get('/:userId', getUser)
userRoutes.get('/:userId/items', getUserItems)
userRoutes.post('/login', validateLogin, login)
userRoutes.post('/signup', validateSignup, signUp)
userRoutes.patch('/:userId', validateEdit, checkAuth, patchUser)