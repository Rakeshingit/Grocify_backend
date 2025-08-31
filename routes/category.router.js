import express from "express";
import {createCategory, handleGetCategories } from '../controllers/category.controller.js';
import {handleCreateSubcategories} from '../controllers/subCategory.controller.js';

const categoryRouter = express.Router();

categoryRouter.post('/admin/create-category', createCategory);
categoryRouter.post('/admin/create-subcategory', handleCreateSubcategories);
categoryRouter.get("/get-subcategories", handleGetCategories);

export default categoryRouter;