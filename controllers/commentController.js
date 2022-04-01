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
        const { comment } = req.body;
        try {
            await Comment.update(
                { comment },
                { where: { id: req.params.commentId } }
            );

            const patchComment = await Comment.findByPk(req.params.commentId);

            res.json(patchComment);
        } catch (error) {
            res.json(error);
        }
    },
    deleteComment: async (req, res) => {
        try {
            const delComment = await Comment.findByPk(req.params.commentId);

            await Comment.destroy({
                where:{ id: req.params.commentId }
            });

            res.json(delComment);
        } catch (error) {
            res.json(error);
        }
    }
};
