import categoryModel from "../models/categories.model.js";
import subcategoryModel from "../models/subcategories.model.js";



async function createCategory(req, res) {
    const {name, subCategories, description} = req.body;
    try{
        const isDuplicate = await categoryModel.findOne({name:name});
        if(isDuplicate){
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            })
        }

        const creatingCategory = new categoryModel({
            name,
            subCategories,
            description,
        })

        const isSaved = await creatingCategory.save();
        if(isSaved){
            return res.status(200).json({
                message: "Category added to cart",
                success: true,
            })
        }
    }catch(e){
        console.log(e);
    }
}

async function handleGetCategories(req, res) {
    const categoryList = await subcategoryModel.find({});
    if(categoryList){
    return res.status(200).json(categoryList);
    }
    else{
        return res.status(404).json("No category found");
    }
}

export {createCategory, handleGetCategories}