import express from "express";
import { deleteComment, getComment, getComments, postComment } from "../controllers/comment-controller.js";
import { checkAuth } from "../middleware/auth.js";
import { validateComment } from "../middleware/validation/comment-validation.js";

export const commentRoutes = express.Router();

commentRoutes
    .get('/', getComments)
    .post('/', checkAuth, validateComment, postComment)

commentRoutes
    .get('/:commentId', getComment)
    .delete('/:commentId', checkAuth, deleteComment)