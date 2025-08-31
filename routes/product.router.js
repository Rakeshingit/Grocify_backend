import express from "express";
import { productController, handleGetProducts } from '../controllers/product.controller.js';


const productRouter = express.Router();

productRouter.post('/admin/create-product', productController);
productRouter.put('/admin/update-product/:id', productController);
productRouter.get('/get-products', handleGetProducts);

export default productRouter;