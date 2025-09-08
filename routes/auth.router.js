import express from "express";
import { handleUserRegistration , handleUserLogIn} from '../controllers/user.controller.js';
import {handleAdminGetUsers, handleLogout} from "../controllers/admin.controller.js";

const authRouter = express.Router();

// User Routes
authRouter.post("/registration", handleUserRegistration);
authRouter.post("/login", handleUserLogIn);

//Admin Routes
// authRouter.post('/admin/login', handleAdminLogin);
authRouter.get('/admin/get-users', handleAdminGetUsers);
authRouter.post('/logout', handleLogout);

export default authRouter;
