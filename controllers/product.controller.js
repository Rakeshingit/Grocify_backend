import productModel from "../models/product.model.js";
import subcategoriesModel from "../models/subcategories.model.js";
import { errorResponse, successResponse } from "../utils/response.js";

const handleCreateProduct = async (req, res) => {
  if (!req.files) errorResponse(res, "No images uploaded.", 400);

  const imageUrls = [];

  req.files.map((file) => {
    let fullUrl = `${process.env.IMAGE_URL_PREFIX}${file.filename}`;
    imageUrls.push(fullUrl);
  });

  const productData = req.body;
  productData.images = imageUrls;

  const getCategoryId = await subcategoriesModel.findOne({ name: productData.category });
  productData.category = getCategoryId.id;
  const addingProduct = new productModel(productData);
  let isSaved = await addingProduct.save();
  if (isSaved) successResponse(res, null, "Product Created ✅", 200);
};

const handleGetProducts = async (req, res) => {
  const allProducts = await productModel.find().populate("category", "name").exec();
  successResponse(res, allProducts, "All products fetched successfully.", 200);
};

const handlePatchProduct = async (req, res) => {
  const Pid = req.params.id;
  const update = req.body;
  const filter = { _id: Pid };
  const updated = await productModel.findOneAndUpdate(filter, update, { new: true });
  successResponse(res, updated, "Product details updated successfully.", 200);
};

const handleDeleteProduct = async (req, res) => {
  const Pid = req.params.id;
  const filter = { _id: Pid };
  const deleted = await productModel.deleteOne(filter);
  successResponse(res, deleted, "Product deleted successfully.", 200);
};

export { handleCreateProduct, handleGetProducts, handlePatchProduct, handleDeleteProduct };
