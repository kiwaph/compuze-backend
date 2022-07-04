import express from "express";
import { getFavorites, postFavorite, deleteFavorite, getFavorite } from "../controllers/favorite-controller.js";
import { checkAuth } from "../middleware/auth.js";

export const favoriteRoutes = express.Router();

favoriteRoutes
    .get('/', checkAuth, getFavorites)
    .get('/:itemId', checkAuth, getFavorite)
    .post('/:itemId', checkAuth, postFavorite)
    .delete('/:itemId', checkAuth, deleteFavorite)