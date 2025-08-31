import mongoose from "mongoose";

const mainCategorySchema = new mongoose.Schema({
    name: {type: String, required: true,},
    subCategories: [{type: String}],
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

const categoryModel = mongoose.model("categoryModel", mainCategorySchema);

export default categoryModel;
