import express from "express";
import {
  productController,
  handleGetProducts,
  handlePatchProduct,
  handleDeleteProduct,
} from "../controllers/product.controller.js";
import { catchAsync } from "../utils/catchAsync.js";
import authenticateUser from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { ROLES } from "../constants.js";
import uploader from "../middlewares/imageUploader.middleware.js";

const productRouter = express.Router();

productRouter.use(authenticateUser);

productRouter.get("/", authorize([ROLES.ADMIN, ROLES.CUSTOMER]), catchAsync(handleGetProducts));
productRouter.post("/", authorize([ROLES.ADMIN]), uploader.array("productImg", 8), catchAsync(productController));
productRouter.patch("/:id", authorize([ROLES.ADMIN]), uploader.array("productImg", 8), catchAsync(handlePatchProduct));
productRouter.delete("/:id", authorize([ROLES.ADMIN]), catchAsync(handleDeleteProduct));

export default productRouter;
