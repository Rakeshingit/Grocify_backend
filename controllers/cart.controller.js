// imports
import itemModel from "../models/cart.model.js";
// import {error} from "console";

async function handleGetCart(req, res) {
    const fromdb = await itemModel.find({})
            const datadb = JSON.stringify(fromdb);
            res.send(datadb).status(200);
        // .catch((err) => console.log(`Error finding ${err}`));
}
async function handleAddItems(req, res) {
    const fromdb = await itemModel.find({});
    const isValid = await serverSide_itemCheck(fromdb, req.body);
    res.send(isValid);
}

async function handleDeleteCart(req, res) {
    try {
        const { id } = req.params;
        let deleteResult = await itemModel.deleteOne({ _id: id });

        if (deleteResult.deletedCount === 1) {
            res.json({ message: "Document deleted succesfully!" });
        } else {
            res.status(404).json({ message: "Document not found" });
        }
    } catch (err) {
        console.error("The error is: " + err);
        res.status(500).json({ message: "internal server error" });
    }
}

async function serverSide_itemCheck(stored_item, received_item) {
    let stored_item_local = [...stored_item];
    for (let i = 0; i < stored_item.length; i++) {
        if (stored_item_local[i].fruitName === received_item.fruitName) {
            return "Item already exists";
        }
    }
    const insertItem = new itemModel({
        fruitId: received_item.id,
        fruitName: received_item.fruitName,
        fruitPrice: received_item.fruitPrice,
        fruitQuantity: received_item.fruitQuantity,
    });
    const saveup = await insertItem.save()
    if(saveup){
        console.log("Item added to cart");
     return saveup
    }
    else{
        console.log("Unable to add item to cart")
        return saveup
    }
}

export {
    handleGetCart,
    handleAddItems,
    handleDeleteCart
}