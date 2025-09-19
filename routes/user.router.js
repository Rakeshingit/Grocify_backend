import express from "express";
import authenticateUser from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { ROLES } from "../constants.js";
import {
  handleDeleteCustomerAddresses,
  handleGetCustomerAddresses,
  handleGetCustomerProfile,
  handlePatchCustomerAddresses,
  handlePatchCustomerPassword,
  handlePatchCustomerProfile,
  handlePostCustomerAddresses,
} from "../controllers/userControllers/customer.controller.js";
import { catchAsync } from "../utils/catchAsync.js";
import {
  handleDeleteUser,
  handleGetAllUsers,
  handleGetUserById,
  handlePatchUserStatus,
} from "../controllers/userControllers/admin.controller.js";

const userRouter = express.Router();

//Customer routes
const customerRouter = express.Router();
customerRouter.use(authenticateUser, authorize([ROLES.CUSTOMER]));
customerRouter.get("/profile", catchAsync(handleGetCustomerProfile));
// Todo
customerRouter.patch("/profile", catchAsync(handlePatchCustomerProfile));
customerRouter.patch("/change-password", catchAsync(handlePatchCustomerPassword));
customerRouter.get("/addresses", catchAsync(handleGetCustomerAddresses));
customerRouter.post("/addresses", catchAsync(handlePostCustomerAddresses));
customerRouter.patch("/addresses/:id", catchAsync(handlePatchCustomerAddresses));
customerRouter.delete("/addresses/:id", catchAsync(handleDeleteCustomerAddresses));

//Admin routes
const adminRouter = express.Router();
adminRouter.use(authenticateUser, authorize([ROLES.ADMIN]));
adminRouter.get("/users?", catchAsync(handleGetAllUsers));
adminRouter.get("/:id", catchAsync(handleGetUserById));
adminRouter.patch("/:id/status", catchAsync(handlePatchUserStatus));
adminRouter.delete("/:id", catchAsync(handleDeleteUser));

userRouter.use("/", customerRouter);
userRouter.use("/", adminRouter);
export default userRouter;
