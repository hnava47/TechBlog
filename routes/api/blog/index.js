const router = require('express').Router();

router.route('/')
    .get()
    .post();

router.route('/:blogId')
    .get()
    .patch()
    .post()
    .delete();

router.route('/:blog/comment')
    .post();

module.exports = router;
