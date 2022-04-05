const { Comment } = require('../models');

module.exports = {
    createComment: async (req, res) => {
        const { blogId, comment } = req.body;
        try {
            const createdCommentData = await Comment.create({
                creatorId: req.session.user.id,
                blogId,
                comment
            });

            const createdComment = createdCommentData.get({ plain: true });

            createdComment.user = {
                firstName: req.session.user.firstName,
                lastName: req.session.user.lastName
            };

            res.json(createdComment);
        } catch (error) {
            res.json(error);
        }
    },
    updateComment: async (req, res) => {
        const { commentId } = req.params;
        const { comment } = req.body;
        try {
            await Comment.update(
                { comment },
                { where: { id: commentId } }
            );

            const patchComment = await Comment.findByPk(commentId);

            res.json(patchComment);
        } catch (error) {
            res.json(error);
        }
    },
    deleteComment: async (req, res) => {
        const { commentId } = req.params;

        try {
            const delComment = await Comment.findByPk(commentId);

            await Comment.destroy({
                where: { id: commentId }
            });

            res.json(delComment);
        } catch (error) {
            res.json(error);
        }
    }
};
