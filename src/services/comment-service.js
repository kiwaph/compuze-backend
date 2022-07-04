import { Comment } from '../db/comment-db.js'

export async function findComments(itemId) {
    const comments = itemId
        ? await Comment.fetchByItemId(itemId)
        : await Comment.fetchAll()
    
    if (!comments.length) {
        return [];
    }

    return comments;
}

export async function findCommentById(commentId) {
    return await Comment.fetchById(commentId);
}

export async function createComment({content, userId, itemId}) {
    const comment = new Comment({
        content: content,
        userId: userId,
        itemId: itemId
    });

    await comment.save();
}

export async function removeCommentById(commentId) {
    await Comment.deleteById(commentId);
}

export function isAuthorOfComment(user, comment) {
    if (user.id != comment.user_id) {
        return false;
    }
    return true;
}