import express from "express";
import { handleCreateCategory, handleGetCategories } from "../controllers/category.controller.js";
import { handleCreateSubcategory } from "../controllers/subCategory.controller.js";
import { catchAsync } from "../utils/catchAsync.js";

const categoryRouter = express.Router();

categoryRouter.get("/", catchAsync(handleGetCategories));
categoryRouter.post("/", catchAsync(handleCreateCategory));
// categoryRouter.post("/admin/create-subcategory", catchAsync(handleCreateSubcategories));

export default categoryRouter;
