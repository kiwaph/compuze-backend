import { comparePasswords, createToken, createUser, findUserById, findUserByUsername, modifyUser } from '../services/user-service.js';

export async function getUser(req, res, next) {
    try {
        const user = await findUserById(req.params.userId);

        if (!user) {
            return next();
        }

        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

export async function login(req, res, next) {
    try {

        if (req.validationErrors.length) {
            return res.status(422).json(req.validationErrors);
        }

        return res.status(200).json({
            message: "Logged-in!",
            token: await createToken(req.user),
            username: req.user.username,
            userId: req.user.id
        })

    } catch (err) {
        next(err)
    }
}

export async function signUp(req, res, next) {
    try {
        if (req.validationErrors.length) {
            return res.status(422).json(req.validationErrors);
        }

        await createUser({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        })

        res.status(201).json('Signup success')

    } catch (err) {
        next(err)
    }
}

export async function patchUser(req, res, next) {
    try {

        if (req.validationErrors.length) {
            return res.status(422).json(req.validationErrors);
        }
        
        const user = await findUserById(req.params.userId);

        if (!user) {
            return next();
        }

        if (!(req.user.id === user.id)) {
            return res.status(403).json({ message: "Not authorized to edit user" })
        }

        await modifyUser({
            userId: req.params.userId,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        });

        return res.status(201).json({ message: "User updated" });


    } catch (err) {
        next(err)
    }

}