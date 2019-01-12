const express = require('express')
const router = express.Router();
const usersRouter = require('./users')
const otherRouter = require('./other')

router.use('/',otherRouter);
router.use('/users',usersRouter);

module.exports = router
