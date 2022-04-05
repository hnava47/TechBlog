const router = require('express').Router();
const apiRoutes = require('./api');
const {
    homePage,
    loginView,
    signupView
} = require('../controllers/userController');

router.get('/', homePage);
router.get('/login', loginView);
router.get('/signup', signupView);

router.use('/api', apiRoutes);

module.exports = router;
