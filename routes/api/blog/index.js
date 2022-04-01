const router = require('express').Router();
const {
    viewAllBlogs,
    viewBlog,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../../../controllers/blogController');
const {
    createComment,
    updateComment,
    deleteComment
} = require('../../../controllers/commentController');

router.route('/')
    .get(viewAllBlogs)
    .post(createBlog);

router.route('/:blogId')
    .get(viewBlog)
    .patch(updateBlog)
    .delete(deleteBlog);

router.route('/:blog/comment')
    .post(createComment);

router.route('/:blog/comment/:commentId')
    .patch(updateComment)
    .delete(deleteComment);

module.exports = router;
