import express from "express";
import {createCategory, handleGetCategories } from '../controllers/createCategoryControl.js';
import {handleCreateSubcategories} from '../controllers/createSubcategoryControl.js';

const createCategoryRouter = express.Router();

createCategoryRouter.post('/admin/create-category', createCategory);
createCategoryRouter.post('/admin/create-subcategory', handleCreateSubcategories);
createCategoryRouter.get("/get-subcategories", handleGetCategories);

export default createCategoryRouter;