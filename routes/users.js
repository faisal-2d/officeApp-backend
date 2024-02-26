// users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/:name', usersController.getUser);
router.get('/', usersController.getUsers);

router.get('/isadmin/:email', usersController.getAdmin);
router.get('/ismoderator/:email', usersController.getModerator);
router.get('/isassistant/:email', usersController.getAssitant);

router.post('/create', usersController.createUser);
module.exports = router;
