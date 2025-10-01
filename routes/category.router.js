import express from "express";
import { handleCreateCategory, handleGetCategories } from "../controllers/category.controller.js";
import { handleCreateSubcategory } from "../controllers/subCategory.controller.js";
import { catchAsync } from "../utils/catchAsync.js";
import authenticateUser from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { ROLES } from "../constants.js";

const categoryRouter = express.Router();

categoryRouter.get("/", authenticateUser, authorize([ROLES.ADMIN, ROLES.CUSTOMER]), catchAsync(handleGetCategories));
categoryRouter.post("/", authenticateUser, authorize([ROLES.ADMIN]), catchAsync(handleCreateCategory));
// categoryRouter.post("/admin/create-subcategory", catchAsync(handleCreateSubcategories));

export default categoryRouter;
