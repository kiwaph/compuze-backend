import express from "express";
import { deleteItem, putItem, getItem, getItems, getRandom, postItem, patchViews } from "../controllers/item-controller.js";
import { checkAuth } from "../middleware/auth.js";
import { validateItem } from "../middleware/validation/item-validation.js";

export const itemRoutes = express.Router();

itemRoutes
    .get('/', getItems)
    .post('/', checkAuth, validateItem, postItem)

itemRoutes
    .get('/random', getRandom)

itemRoutes
    .get('/:itemId', getItem)
    .patch('/:itemId/views', patchViews)
    .put('/:itemId', checkAuth, validateItem, putItem)
    .delete('/:itemId', checkAuth, deleteItem)