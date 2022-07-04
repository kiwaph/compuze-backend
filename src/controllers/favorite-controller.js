import { addItemToFavorites, findFavorite, findFavorites, removeItemFromFavorites } from "../services/favorite-service.js";
import { findItemById } from "../services/item-service.js";

export async function getFavorites(req, res, next) {
    try {
        const favorites = await findFavorites(req.user.id);

        res.status(200).json(favorites);

    } catch (err) {
        next(err)
    }
}

export async function postFavorite(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        if (await findFavorite(req.user.id, req.params.itemId)) {
            return res.status(400).json({ message: "Item already in favorites" })
        }

        await addItemToFavorites(req.user.id, req.params.itemId);
        return res.status(200).json({ message: "Item added to favorites." })

    } catch (err) {
        next(err)
    }
}

export async function deleteFavorite(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        if (!await findFavorite(req.user.id, req.params.itemId)) {
            return next();
        }

        await removeItemFromFavorites(req.user.id, req.params.itemId);
        return res.status(200).json({ message: "Item removed from favorites." })

    } catch (err) {
        next(err)
    }
}

export async function getFavorite(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        const favorite = await findFavorite(req.user.id, req.params.itemId);

        if (!favorite) {
            return next();
        }

        return res.status(200).json(favorite);

    } catch (err) {
        next(err)
    }
}