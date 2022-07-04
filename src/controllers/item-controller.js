import { createItem, replaceItem, isAuthorOfItem, incrementItemViews, findItems, findItemById, findRandomItem, findItemsByUserId, countItems, removeItemById } from "../services/item-service.js";

const ITEMS_PER_PAGE = 10;

export async function getItems(req, res, next) {
    try {
        const items = await findItems({
            type: req.query.type,
            search: req.query.search,
            sort: req.query.sort,
            order: req.query.order,
            page: req.query.page,
            perPage: ITEMS_PER_PAGE
        });

        const count = await countItems(req.query.type);

        res.status(200).json({
            items: items,
            count: count,
            perPage: ITEMS_PER_PAGE
        });

    } catch (err) {
        next(err)
    }
}

export async function getUserItems(req, res, next) {
    try {
        const items = await findItemsByUserId(req.params.userId);
        res.status(200).json(items);
    } catch (err) {
        next(err)
    }
}

export async function patchViews(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        await incrementItemViews(req.params.itemId);
        return res.status(200).json({ message: "incremented views" });
    } catch (err) {
        next(err)
    }
}

export async function postItem(req, res, next) {
    try {
        if (req.validationErrors.length) {
            return res.status(422).json(req.validationErrors);
        }

        await createItem({
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model,
            description: req.body.description,
            location: req.body.location,
            price: req.body.price,
            userId: req.user.id
        });

        res.status(201).json({ message: "Item created" });

    } catch (err) {
        next(err)
    }
}

export async function getRandom(req, res, next) {
    try {
        const item = await findRandomItem();
        res.status(200).json(item);
    } catch (err) {
        next(err)
    }
}

export async function getItem(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        return res.status(200).json(item);

    } catch (err) {
        next(err)
    }
}


export async function putItem(req, res, next) {
    try {
        
        if (req.validationErrors.length) {
            return res.status(422).json(req.validationErrors);
        }
        
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        if (!isAuthorOfItem(req.user, item)) {
            return res.status(403).json({ message: "Not authorized to edit item" })
        }

        await replaceItem({
            itemId: req.params.itemId,
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model,
            description: req.body.description,
            location: req.body.location,
            price: req.body.price
        });

        return res.status(201).json({ message: "Item updated" });

    } catch (err) {
        next(err)
    }
}

export async function deleteItem(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }
        if (!isAuthorOfItem(req.user, item)) {
            return res.status(403).json({ message: "Not authorized to delete item" })
        }

        await removeItemById(req.params.itemId)
        return res.status(200).json({ message: "Item deleted." })

    } catch (err) {
        next(err)
    }
}