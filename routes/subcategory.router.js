import express from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { handleCreateSubcategory, handleGetSubcategory } from "../controllers/subCategory.controller.js";
import authenticateUser from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { ROLES } from "../constants.js";
import uploader from "../middlewares/imageUploader.middleware.js";

export const subcategoryRouter = express.Router();

subcategoryRouter.get(
  "/",
  authenticateUser,
  authorize([ROLES.ADMIN, ROLES.CUSTOMER]),
  catchAsync(handleGetSubcategory)
);
subcategoryRouter.post(
  "/",
  authenticateUser,
  authorize([ROLES.ADMIN]),
  uploader.array("subcategoryImg", 2),
  catchAsync(handleCreateSubcategory)
);
