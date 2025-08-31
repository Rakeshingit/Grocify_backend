import mongoose from "mongoose";

const subcategoriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref:'categoryModel', required: true },
    description: { type: String, required: true },
})

const subcategoriesModel = mongoose.model('subcategoriesModel', subcategoriesSchema);

export default subcategoriesModel;