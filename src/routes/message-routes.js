import express from "express";
import { deleteMessage, getMessage, getMessages, markMessageAsRead, markMessageAsUnread, postMessage } from "../controllers/message-controller.js";
import { checkAuth } from "../middleware/auth.js";
import { validateMessage } from "../middleware/validation/message-validation.js";

export const messageRoutes = express.Router();

messageRoutes
    .get('/', checkAuth, getMessages)
    .post('/', checkAuth, validateMessage, postMessage)

messageRoutes
    .get('/:messageId', checkAuth, getMessage)
    .delete('/:messageId', checkAuth, deleteMessage)

messageRoutes
    .patch('/:messageId/read', checkAuth, markMessageAsRead)
    .delete('/:messageId/read', checkAuth, markMessageAsUnread)