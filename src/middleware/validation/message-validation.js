import { findUserByUsername } from "../../services/user-service.js";

export async function validateMessage(req, res, next) {
    req.validationErrors = [];
    const { subject, content, recipientUsername } = req.body;
    
    if (!subject.length) {
        req.validationErrors.push({msg: 'Subject cannot be empty'})
    }

    if (!content.length) {
        req.validationErrors.push({msg: 'Message content cannot be empty'})
    }

    const recipient = await findUserByUsername(recipientUsername);

    if (!recipient) {
        req.validationErrors.push({ msg: "User does not exist" })
    } else {
        req.recipient = recipient;
    }

    if (recipient.id === req.user.id) {
        req.validationErrors.push({ msg: "You cannot send a message to yourself" })
    }

    next();
}