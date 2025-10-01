import express from "express";
import {
  handleCreateProduct,
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

productRouter.get("/", authenticateUser, authorize([ROLES.ADMIN, ROLES.CUSTOMER]), catchAsync(handleGetProducts));
productRouter.post(
  "/",
  authenticateUser,
  authorize([ROLES.ADMIN]),
  uploader.array("productImg", 8),
  catchAsync(handleCreateProduct)
);
productRouter.patch(
  "/:id",
  authenticateUser,
  authorize([ROLES.ADMIN]),
  uploader.array("productImg", 8),
  catchAsync(handlePatchProduct)
);
productRouter.delete("/:id", authenticateUser, authorize([ROLES.ADMIN]), catchAsync(handleDeleteProduct));

export default productRouter;
