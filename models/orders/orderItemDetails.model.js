import mongoose from "mongoose";

const orderItemDetailsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  priceAtPurchase: {
    type: Number,
    required: true,
  },
});

export const orderItemDetailsModel = new mongoose.model("orderItemDetailsModel", orderItemDetailsSchema);
