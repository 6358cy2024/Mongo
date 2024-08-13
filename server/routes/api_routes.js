const router = require('express').Router();

const autobot_controller = require('../contollers/autobot_controller');

router.get('/autobots', autobot_controller.getAllAutobots);


router.post('/autobots', autobot_controller.createAutobots);
module.exports = router;