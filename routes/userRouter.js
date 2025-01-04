const express = require('express');
const { handleUserRegistration , handleUserLogIn} = require('../controllers/userControl');

const router = express.Router();

router.post("/user-registration", handleUserRegistration);
router.post("/login", handleUserLogIn);

module.exports = router;
