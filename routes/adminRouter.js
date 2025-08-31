import express from "express";
import {handleAdminLogin, handleAdminGetUsers, handleAdminLogout} from '../controllers/adminControl.js';
// const handleAdminGetUsers = require('../controllers/adminControl');

const adminRouter = express.Router();

adminRouter.post('/admin/login', handleAdminLogin);
adminRouter.get('/admin/get-users', handleAdminGetUsers);
adminRouter.post('/admin/logout', handleAdminLogout);

export default adminRouter;