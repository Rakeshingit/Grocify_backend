const express = require('express');
const { handleCreateProduct, handleGetProducts} = require('../controllers/handleCreateProduct');


const router = express.Router();

router.post('/admin/create-product', handleCreateProduct);
router.put('/admin/update-product/:id', handleCreateProduct);
router.get('/get-products', handleGetProducts);

module.exports = router;