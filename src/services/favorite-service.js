import { Favorite } from "../db/favorite-db.js";

export async function addItemToFavorites(userId, itemId) {
    return await Favorite.save(userId, itemId);
}

export async function removeItemFromFavorites(userId, itemId) {
    await Favorite.delete(userId, itemId);
}

export async function findFavorite(userId, itemId) {
    const favorite = await Favorite.fetchOneById(userId, itemId);

    if (!favorite) {
        return false;
    }
    return favorite;
}

export async function findFavorites(userId) {
    const favorites = await Favorite.fetchAllByUserId(userId);
    
    if (!favorites.length) {
        return [];
    }

    return favorites;
}