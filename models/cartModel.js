//Imports
const mongoose = require("mongoose");

//Schema
const itemSchema = new mongoose.Schema({
    fruitId: { type: Number, require: true },
    fruitName: { type: String, required: true },
    fruitPrice: { type: Number, required: true },
    fruitQuantity: { type: Number, required: true },
});

const itemModel = mongoose.model("itemModel", itemSchema);

module.exports = itemModel;
