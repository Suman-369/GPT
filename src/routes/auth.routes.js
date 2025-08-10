const express = require('express');
const getResgisterController = require('../controllers/auth.controller').getResgisterController;
const router = express.Router();



router.get("/register", getResgisterController)



module.exports = router