const express = require('express');
const {createCategory, handleGetCategories } = require('../controllers/createCategoryControl');
const {handleCreateSubcategories} = require('../controllers/createSubcategoryControl');

const router = express.Router();

router.post('/admin/create-category', createCategory);
router.post('/admin/create-subcategory', handleCreateSubcategories);
router.get("/get-subcategories", handleGetCategories);

module.exports = router;