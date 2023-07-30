const express = require('express');

const router = express.Router();

const {  registerUser, authUser } = require('../controllers/userController.js') ;

router.post('/login', authUser);
router.post('/', registerUser);


module.exports =  router;