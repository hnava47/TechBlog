const router = require('express').Router();
const blogRoutes = require('./blog');
const userRoutes = require('./user');

router.use('/blogs', blogRoutes);
router.use('/users', userRoutes);

module.exports = router;
