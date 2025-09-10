import express from "express";
import { handleUserRegistration, handleUserLogIn, handleAccessTokenReissue } from "../controllers/user.controller.js";
import { handleAdminGetUsers, handleLogout } from "../controllers/admin.controller.js";
import { catchAsync } from "../utils/catchAsync.js";

const authRouter = express.Router();

// User Routes
authRouter.post("/registration", catchAsync(handleUserRegistration));
authRouter.post("/login", catchAsync(handleUserLogIn));
authRouter.post("/refresh", catchAsync(handleAccessTokenReissue));

//Admin Routes
// authRouter.post('/admin/login', handleAdminLogin);
authRouter.get("/admin/get-users", handleAdminGetUsers);
authRouter.post("/logout", handleLogout);

export default authRouter;
