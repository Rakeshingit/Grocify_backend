import express from "express";
import {handleGetCart, handleAddItems, handleDeleteCart} from "../controllers/cartControl.js";


const router = express.Router();

router.get('/carts', handleGetCart);

router.post('/carts', handleAddItems);

router.delete("/delete-cart-item/:id", handleDeleteCart)

export default router;