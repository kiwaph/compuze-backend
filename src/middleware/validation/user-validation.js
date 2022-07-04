import { comparePasswords, findUserByUsername } from "../../services/user-service.js";
import { isEmailValid, isPasswordValid, isPhoneValid, isUsernameValid } from "./validation-helpers.js";

export async function validateSignup(req, res, next) {
    req.validationErrors = [];
    const { username, phone, email, password, repeatPassword} = req.body;

    if (!isUsernameValid(username)) {
        req.validationErrors.push({ msg: "Username must be at least 3 characters long and cannot contain special characters" });
    } else {
        // If input is correct, check if username exists
        const user = await findUserByUsername(username);
        if (user) {
            req.validationErrors.push({ msg: "Username already taken" });
        }
    }
    
    if (!isPhoneValid(phone)) {
        req.validationErrors.push({ msg: "Please enter a valid phone number" });
    }

    if (!isEmailValid(email)) {
        req.validationErrors.push({ msg: "Please enter a valid email address" });
    }

    if (!isPasswordValid(password)) {
        req.validationErrors.push({msg: 'Password too short (6 characters minimum)'})
    } else {
        if (password !== repeatPassword) {
            req.validationErrors.push({msg: 'Passwords do not match'});
        }
    }

    next();
}

export async function validateLogin(req, res, next) {
    req.validationErrors = [];
    const { username, password } = req.body;

    if (!isUsernameValid(username)) {
        req.validationErrors.push({msg: 'Please enter a valid username'})
    } else {
        // check if user exists
        const user = await findUserByUsername(username);

        if (!user) {
            req.validationErrors.push({ msg: "User does not exist" });
        } else {
            req.user = user;
        }
    }

    if (!isPasswordValid(password)) {
        req.validationErrors.push({msg: 'Please enter your password'});
    } else {
        if (req.user && !await comparePasswords(password, req.user.password)) {
            req.validationErrors.push({ msg: "Invalid Password" });
        }
    }

    next();
}

export async function validateEdit(req, res, next) {
    req.validationErrors = [];
    const { phone, email, password, repeatPassword} = req.body;
    
    if (phone !== undefined && !isPhoneValid(phone)) {
        req.validationErrors.push({ msg: "Please enter a valid phone number" });
    }

    if (email !== undefined && !isEmailValid(email)) {
        req.validationErrors.push({ msg: "Please enter a valid email address" });
    }

    if (password !== undefined && !isPasswordValid(password)) {
        req.validationErrors.push({msg: 'Password too short (6 characters minimum)'})
    } else {
        if (password !== repeatPassword) {
            req.validationErrors.push({msg: 'Passwords do not match'});
        }
    }
    next();
}