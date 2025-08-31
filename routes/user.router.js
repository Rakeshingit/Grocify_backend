import express from "express";
import { handleUserRegistration , handleUserLogIn} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post("/user-registration", handleUserRegistration);
userRouter.post("/login", handleUserLogIn);

export default userRouter;
