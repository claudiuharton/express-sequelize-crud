const express = require('express')
const router = express.Router();
const otherController = require('../controllers').other

router.get('/', otherController.middleware.printMessage, otherController.helloWorld);
router.get('/reset', otherController.reset);

module.exports = router;
