import express from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { handleCreateSubcategory, handleGetSubcategory } from "../controllers/subCategory.controller.js";

export const subcategoryRouter = express.Router();

subcategoryRouter.get("/", catchAsync(handleGetSubcategory));
subcategoryRouter.post("/", catchAsync(handleCreateSubcategory));
