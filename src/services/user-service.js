import { User } from '../db/user-db.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function findUserByUsername(username) {
    return await User.fetchByUsername(username);
}

export async function findUserById(userId) {
    return await User.fetchById(userId);
}

export async function createUser({username, password, email, phone}) {
    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({
        username: username,
        password: hashedPass,
        email: email,
        phone: phone
    });

    user.save();
}

export async function comparePasswords(password1, password2) {
    return bcrypt.compare(password1, password2)
}

export async function createToken(user) {
    return jwt.sign({
        userId: user.id,
        username: user.username
    },
    process.env.SECRET, {expiresIn: "2w"});
}

export async function modifyUser({userId, phone, email, password}) {
    if (phone) {
        await User.editField({
            userId: userId,
            field: 'phone',
            value: phone
        })
    }

    if (email) {
        await User.editField({
            userId: userId,
            field: 'email',
            value: email
        })
    }

    if (password) {
        const hashedPass = await bcrypt.hash(password, 12);
        await User.editField({
            userId: userId,
            field: 'password',
            value: hashedPass
        })
    }
}
