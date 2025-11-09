import mongoose from "mongoose";
const AddressSchema = new mongoose.Schema(
  {
    custId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodels",
      required: true,
    },
    label: {
      type: String,
      default: "home",
      enum: ["home", "work", "other"],
    },
    addressLine1: {
      type: String,
      required: [true, "Please enter a valid address"],
    },
    addressLine2: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const addressModel = mongoose.model("addressModel", AddressSchema);
