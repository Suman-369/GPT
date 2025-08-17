const express = require('express');
const {getResgisterController, postRegisterController ,getLoginController,postLoginController,userLogout}= require('../controllers/auth.controller');
const router = express.Router();



// router.get("/register", getResgisterController)

// router.post("/register", postRegisterController)

router.route("/register")
.get(getResgisterController)
.post(postRegisterController)

router.route("/login")
.get(getLoginController)
.post(postLoginController)

router.route("/logout")
.get(userLogout)

module.exports = router