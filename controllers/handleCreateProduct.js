const productModel = require("../models/productModel");
const subcategoriesModel = require("../models/subcategoriesModel");

const handleCreateProduct = async (req, res) => {
    if(!req.files){
        return res.status(400).send({message:"No file uploaded"});
    }

    const imageUrls = [];

    req.files.map((file) => {
    let fullUrl = `https://localhost:8901/uploads/${file.filename}`
        imageUrls.push(fullUrl);
    });
    const productData = req.body;
    productData.imageUrl = imageUrls;
    try{
        const getCategoryId = await subcategoriesModel.findOne({name: productData.category});
        productData.categoryId = getCategoryId.id;
    const addingProduct = new productModel(productData);
        let isSaved = await addingProduct.save();
        if(isSaved){
            return res.status(200).send({message:"Product added"});
        }
    }
    catch(err){
        console.log(err);
    }
}

const handleGetProducts = async (req, res) => {
    const allProducts = await productModel.find().populate('categoryId', 'name').exec();
    return res.status(200).json(allProducts);
}

module.exports = {handleCreateProduct, handleGetProducts};