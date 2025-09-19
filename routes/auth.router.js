import express from "express";
import { handleUserRegistration, handleUserLogIn, handleAccessTokenReissue } from "../controllers/auth.controller.js";
import { handleLogout } from "../controllers/auth.controller.js";
import { catchAsync } from "../utils/catchAsync.js";

const authRouter = express.Router();

// User Routes
authRouter.post("/registration", catchAsync(handleUserRegistration));
authRouter.post("/login", catchAsync(handleUserLogIn));
authRouter.post("/refresh", catchAsync(handleAccessTokenReissue));
authRouter.post("/logout", handleLogout);

//Admin Routes
// authRouter.post('/admin/login', handleAdminLogin);
// authRouter.get("/admin/get-users", catchAsync(handleAdminGetUsers));

export default authRouter;
