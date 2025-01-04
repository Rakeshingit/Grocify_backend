const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: "subcategoriesModel", required: true},
    SKU: {type: String, required: true},
    price: {type: Number, required: true},
    stockQuantity: {type: Number, default: 0},
    imageUrl: [{type: String, required: true}],
    status: {type: String, required: true},
});

const product = mongoose.model("product", productSchema);

module.exports = product;