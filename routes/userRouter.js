import express from "express";
import { handleUserRegistration , handleUserLogIn} from '../controllers/userControl.js';

const userRouter = express.Router();

userRouter.post("/user-registration", handleUserRegistration);
userRouter.post("/login", handleUserLogIn);

export default userRouter;
