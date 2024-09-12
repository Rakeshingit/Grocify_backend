const express = require('express');
const {handleGetCart, handleAddItems, handleDeleteCart} = require("../controllers/cartControl");


const router = express.Router();

router.get('/carts', handleGetCart);

router.post('/carts', handleAddItems);

router.delete("/delete-cart-item/:id", handleDeleteCart)

module.exports = router;