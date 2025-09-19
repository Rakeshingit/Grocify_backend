import subcategoriesModel from "../models/subcategories.model.js";
import { errorResponse } from "../utils/response.js";

async function handleCreateSubcategory(req, res) {
  const { name, categoryId, description } = req.body;

  try {
    const isDuplicate = await subcategoriesModel.findOne({ name: name });
    if (isDuplicate) {
      return res.status(400).json({
        success: false,
        message: "Subcategory already exists",
      });
    }
    const creatingSubcategory = new subcategoriesModel({ name, categoryId, description });

    const isSaved = await creatingSubcategory.save();
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

const handleGetSubcategory = async (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};

export { handleCreateSubcategory, handleGetSubcategory };
