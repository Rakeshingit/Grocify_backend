import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "subcategoriesModel", required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

export default product;
