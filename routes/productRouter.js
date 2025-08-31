import express from "express";
import { handleCreateProduct, handleGetProducts } from '../controllers/handleCreateProduct.js';


const productRouter = express.Router();

productRouter.post('/admin/create-product', handleCreateProduct);
productRouter.put('/admin/update-product/:id', handleCreateProduct);
productRouter.get('/get-products', handleGetProducts);

export default productRouter;