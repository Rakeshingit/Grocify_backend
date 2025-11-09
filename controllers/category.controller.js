import categoryModel from "../models/category.model.js";
import subcategoryModel from "../models/subcategories.model.js";
import { errorResponse, successResponse } from "../utils/response.js";

async function handleCreateCategory(req, res) {
  const { name, description } = req.body;
  const isDuplicate = await categoryModel.findOne({ name: name });
  if (isDuplicate) {
    errorResponse(res, "Category already exists", 400, isDuplicate);
  }

  const creatingCategory = new categoryModel({
    name,
    description,
  });

  const isSaved = await creatingCategory.save();
  if (isSaved) successResponse(res, null, "Category created.", 200);
}

async function handleGetCategories(req, res) {
  const categoryList = await categoryModel.find({});
  if (categoryList) {
    return successResponse(res, categoryList, undefined, 200);
  } else {
    return errorResponse(res, "No categories found!", 404);
  }
}

export { handleCreateCategory, handleGetCategories };
