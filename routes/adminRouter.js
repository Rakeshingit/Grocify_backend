const express = require('express');
const {handleAdminLogin, handleAdminGetUsers, handleAdminLogout} = require('../controllers/adminControl');
// const handleAdminGetUsers = require('../controllers/adminControl');

const router = express.Router();

router.post('/admin/login', handleAdminLogin);
router.get('/admin/get-users', handleAdminGetUsers);
router.post('/admin/logout', handleAdminLogout);

module.exports = router;