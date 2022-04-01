const router = require('express').Router();
const {
    login,
    signup,
    logout
} = require('../../../controllers/userController');

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

module.exports = router;
