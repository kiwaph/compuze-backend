import { Message } from '../db/message-db.js';

export async function findMessagesByRecipientId(recipient) {
    return await Message.fetchByRecipientId(recipient.id);
}

export async function findMessageById(messageId) {
    return Message.fetchById(messageId);
}

export async function createMessage({subject, content, senderId, recipientId}) {
    const message = new Message({
        subject: subject,
        content: content,
        senderId: senderId,
        recipientId: recipientId
    });

    await message.save();
}

export async function removeMessageById(messageId) {
    await Message.deleteById(messageId);
}

export function isRecipient(user, message) {
    if (user.id != message.recipient_id) {
        return false
    }
    return true;
}

export async function markAsRead(message) {
    if (!message.is_read) {
        await Message.editField({
            messageId: message.id,
            field: 'is_read',
            value: 1
        });
    }
}

export async function markAsUnread(message) {
    if (message.is_read) {
        await Message.editField({
            messageId: message.id,
            field: 'is_read',
            value: 0
        });
    }
}

export function countUnreadMessages(messages) {
    const unreadMessages = messages.filter(message => !message.is_read);
    return unreadMessages.length;
}