import mongoose from "mongoose";

//Schema
const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        require: true
    },
    userFirstName: {
        type: String,
        required: true,
        trim: true
    },
    userLastName: {
        type: String,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        required: [true, "Please enter a valid email"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    phoneNumber: {
        type: String,
        trim: true,
        unique: true,
        match: [/^\d{10}$/, 'Please provide a valid phone number']
    },
    userPassword: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        enum: ["customer", "admin", "seller"],
        default: 'customer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

const userModel = mongoose.model("userModel", userSchema);

export default userModel;