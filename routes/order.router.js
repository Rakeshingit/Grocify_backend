import express from "express";
import authenticateUser from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { ROLES } from "../constants.js";
import {
  handleGetAllOrders,
  handleGetOrders,
  handlePatchOrder,
  handlePostOrder,
} from "../controllers/order.controller.js";

export const orderRouter = express.Router();

//Customer
orderRouter.post("/", authenticateUser, authorize([ROLES.CUSTOMER]), handlePostOrder);
orderRouter.get("/me", authenticateUser, authorize([ROLES.CUSTOMER]), handleGetAllOrders);

//Admin
orderRouter.get("/", authenticateUser, authorize([ROLES.ADMIN]), handleGetOrders);
orderRouter.patch("/:id", authenticateUser, authorize([ROLES.ADMIN]), handlePatchOrder);
