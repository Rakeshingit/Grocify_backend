import mongoose from "mongoose";

//Schema
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter a valid email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phoneNo: {
      type: String,
      trim: true,
      unique: true,
      match: [/^\d{10}$/, "Please provide a valid phone number"],
      required: [true, "Please provide a phone number"],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "seller"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("userModel", userSchema);

export default userModel;
