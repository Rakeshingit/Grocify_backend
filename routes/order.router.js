import express from "express";
import authenticateUser from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { ROLES } from "../constants.js";
import {
  handleGetUserOrders,
  handleGetAllOrders,
  handlePatchOrder,
  handlePostOrder,
} from "../controllers/order.controller.js";
import { catchAsync } from "../utils/catchAsync.js";

export const orderRouter = express.Router();

//Customer
orderRouter.post("/", authenticateUser, authorize([ROLES.CUSTOMER]), catchAsync(handlePostOrder));
orderRouter.get("/me", authenticateUser, authorize([ROLES.CUSTOMER]), catchAsync(handleGetUserOrders));

//Admin
orderRouter.get("/", authenticateUser, authorize([ROLES.ADMIN]), catchAsync(handleGetAllOrders));
orderRouter.patch("/:id", authenticateUser, authorize([ROLES.ADMIN]), catchAsync(handlePatchOrder));
