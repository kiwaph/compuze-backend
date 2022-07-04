
export async function validateComment(req, res, next) {
    req.validationErrors = [];
    const { content } = req.body;

    if (!content.length) {
        req.validationErrors.push({msg: 'Comment is empty'})
    }

    next();
}