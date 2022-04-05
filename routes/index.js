const router = require('express').Router();
const apiRoutes = require('./api');
const {
    homePage,
    loginView,
    signupView
} = require('../controllers/userController');
const {
    viewAllBlogs
} = require('../controllers/blogController');

router.get('/', homePage);
router.get('/login', loginView);
router.get('/signup', signupView);
router.get('/home', viewAllBlogs);

router.use('/api', apiRoutes);

module.exports = router;
