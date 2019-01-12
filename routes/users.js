const express = require('express')
const router = express.Router();
const usersController = require('../controllers').users


router.get('/names',usersController.getNames);

router.get('/', usersController.findAll);
router.post('/', usersController.create);
router.get('/:id', usersController.findById);
router.put('/:id', usersController.edit);
router.delete('/:id', usersController.delete);


module.exports = router;
