import { createComment, findCommentById, findComments, isAuthorOfComment, removeCommentById } from "../services/comment-service.js";
import { findItemById } from "../services/item-service.js";

export async function getComments(req, res, next) {
    try {
        const comments = await findComments(req.query.itemId);
        res.status(200).json(comments);
    } catch (err) {
        next(err)
    }
}

export async function getComment(req, res, next) {
    try {
        const comment = await findCommentById(req.params.commentId);

        if (!comment) {
            return next();
        }
        return res.status(200).json(comment);
    } catch (err) {
        next(err)
    }

}

export async function postComment(req, res, next) {
    try {

        if (req.validationErrors.length) {
            return res.status(422).json(req.validationErrors);
        }
        
        const item = await findItemById(req.body.itemId);

        if (!item) {
            return next();
        }

        await createComment({
            content: req.body.content,
            userId: req.user.id,
            itemId: req.body.itemId
        });

        res.status(201).json({ message: "Comment posted" });

    } catch (err) {
        next(err)
    }
}



export async function deleteComment(req, res, next) {
    try {
        const comment = await findCommentById(req.params.commentId);

        if (!comment) {
            return next();
        }

        if (!isAuthorOfComment(req.user, comment)) {
            return res.status(403).json({ message: "Not authorized to delete comment" })
        }

        await removeCommentById(req.params.commentId);
        res.status(200).json({ message: "Comment deleted" })
    } catch (err) {
        next(err)
    }
}