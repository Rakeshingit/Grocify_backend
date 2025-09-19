import categoryModel from "../models/categories.model.js";
import subcategoryModel from "../models/subcategories.model.js";
import { errorResponse, successResponse } from "../utils/response.js";

async function handleCreateCategory(req, res) {
  const { name, subCategories, description } = req.body;
  try {
    const isDuplicate = await categoryModel.findOne({ name: name });
    if (isDuplicate) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const creatingCategory = new categoryModel({
      name,
      subCategories,
      description,
    });

    const isSaved = await creatingCategory.save();
    if (isSaved) {
      return res.status(200).json({
        message: "Category added to cart",
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
  }
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
