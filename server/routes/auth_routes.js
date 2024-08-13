const router = require('express').Router();
const auth_controller = require('../controllers/auth_controller');

router.post('/register', auth_controller.registerUser);

router.post('/login', auth_controller.loginUser);

module.exports = router;