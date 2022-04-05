const router = require('express').Router();
const blogRoutes = require('./blog');
const commentRoutes = require('./comment');
const userRoutes = require('./user');

router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;
