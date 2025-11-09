import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "usermodels", required: true },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItemDetailsModels",
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      required: true,
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
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "failed", "refunded"],
    },
  },

  { timestamps: true }
);

export const orderModel = mongoose.model("orderModel", orderSchema);
