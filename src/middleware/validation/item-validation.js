import { isPriceValid } from "./validation-helpers.js";

export function validateItem(req, res, next) {
    const { type, brand, model, description, location, price } = req.body;
    
    req.validationErrors = [];

    if (!type.length) {
        req.validationErrors.push({ msg: 'Please select a type' });
    }

    if (!brand.length) {
        req.validationErrors.push({ msg: 'Please enter a brand' });
    }

    if (!model.length) {
        req.validationErrors.push({ msg: 'Please enter a model number' });
    }

    if (!description.length) {
        req.validationErrors.push({ msg: 'Please type a description' });
    }

    if (!location.length) {
        req.validationErrors.push({ msg: `Please enter the item's location`});
    }

    if (!isPriceValid(price)) {
        req.validationErrors.push({ msg: `Please enter a valid price`});
    }

    next();
}