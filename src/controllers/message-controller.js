import { countUnreadMessages, createMessage, findMessageById, findMessagesByRecipientId, isRecipient, markAsRead, markAsUnread, removeMessageById } from "../services/message-service.js";
import { findUserByUsername } from "../services/user-service.js";

export async function getMessages(req, res, next) {
    try {
        const messages = await findMessagesByRecipientId(req.user);
        const unreadCount = countUnreadMessages(messages);

        return res.status(200).json({
            messages: messages,
            unreadCount: unreadCount
        });

    } catch (err) {
        next(err)
    }
}

export async function getMessage(req, res, next) {
    try {
        const message = await findMessageById(req.params.messageId);

        if (!message) {
            return next();
        }

        if (!isRecipient(req.user, message)) {
            return res.status(403).json({ message: "Not authorized to read message" })
        }

        return res.status(200).json(message);
    } catch (err) {
        next(err)
    }
}

export async function postMessage(req, res, next) {
    try {
        if (req.validationErrors.length) {
            return res.status(422).json(req.validationErrors);
        }

        await createMessage({
            subject: req.body.subject,
            content: req.body.content,
            senderId: req.user.id,
            recipientId: req.recipient.id
        });

        return res.status(201).json({ message: "Message sent" })
    } catch (err) {
        next(err)
    }
}

export async function markMessageAsRead(req, res, next) {
    try {
        const message = await findMessageById(req.params.messageId);

        if (!message) {
            return next();
        }

        if (!isRecipient(req.user, message)) {
            return res.status(403).json({ message: "Not authorized to modify message" })
        }

        await markAsRead(message);
        return res.status(200).json({ message: "Message marked as read" });
    } catch (err) {
        next(err)
    }
}

export async function markMessageAsUnread(req, res, next) {
    try {
        const message = await findMessageById(req.params.messageId);

        if (!message) {
            return next();
        }

        if (!isRecipient(req.user, message)) {
            return res.status(403).json({ message: "Not authorized to modify message" })
        }

        await markAsUnread(message);
        return res.status(200).json({ message: "Message marked as unread" });
    } catch (err) {
        next(err)
    }
}

export async function deleteMessage(req, res, next) {
    try {
        const message = await findMessageById(req.params.messageId);

        if (!message) {
            return next();
        }

        if (!isRecipient(req.user, message)) {
            return res.status(403).json({ message: "Not authorized to delete message" })
        }

        await removeMessageById(req.params.messageId);
        return res.status(200).json({ message: "Message deleted" });
    } catch (err) {
        next(err)
    }
}