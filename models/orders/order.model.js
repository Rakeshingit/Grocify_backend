import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "usermodels", required: true },
    orderItemsDetails: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        totalAmount: {
          type: Number,
          required: true,
        },
      },
    ],
    finalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      required: true,
      default: "pending",
    },
    expectedDeliveryDate: {
      type: Date,
      required: true,
    },
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addressModels",
      required: true,
    },
    actualDeliveryDate: {
      type: Date,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "failed", "refunded"],
      default: "unpaid",
    },
  },

  { timestamps: true }
);

export const orderModel = mongoose.model("orderModel", orderSchema);
