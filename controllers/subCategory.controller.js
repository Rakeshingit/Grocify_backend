import subcategoriesModel from "../models/subcategories.model.js";
import { errorResponse, successResponse } from "../utils/response.js";

async function handleCreateSubcategory(req, res) {
  if (!req.files) errorResponse(res, "No images uploaded.", 400);

  const imageUrls = [];

  req.files.map((file) => {
    let fullUrl = `${process.env.IMAGE_URL_PREFIX}${file.filename}`;
    imageUrls.push(fullUrl);
  });

  // const { name, categoryId, description } = req.body;
  const subcategory = req.body;
  subcategory.image = imageUrls[0];

  const isDuplicate = await subcategoriesModel.findOne({ name: subcategory.name });
  if (isDuplicate) errorResponse(res, "Subcategory already exists", 400, isDuplicate);

  const creatingSubcategory = new subcategoriesModel(subcategory);

  const isSaved = await creatingSubcategory.save();
  if (isSaved) successResponse(res, null, "Subcategory created successfully.", 201);
}

const handleGetSubcategory = async (req, res) => {
  const subcategories = subcategoriesModel.find({});
  successResponse(res, subcategories, "Success", 200);
};

export { handleCreateSubcategory, handleGetSubcategory };
