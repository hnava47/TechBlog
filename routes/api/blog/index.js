const router = require('express').Router();
const {
    viewAllBlogs,
    viewBlog,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../../../controllers/blogController');

router.route('/')
    .get(viewAllBlogs)
    .post(createBlog);

router.route('/:blogId')
    .get(viewBlog)
    .patch(updateBlog)
    .delete(deleteBlog);

module.exports = router;
