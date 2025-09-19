// require('dotenv').config();
import { successResponse } from "../utils/response.js";

const secretKey = process.env.SECRET_KEY;

// const mongoose = require("mongoose");
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// async function handleAdminLogin(req, res) {
//     const {email, password} = req.body;
//
//     try{
//         const user = await userModel.findOne({userEmail:email});
//         if(!user){
//             return res.status(400).json({
//                 message: "Invalid email or password"
//             })
//         }
//         const isMatch = await bcrypt.compare(password, user.userPassword);
//         if(!isMatch){
//             return res.status(400).json({
//                 message: "Invalid email or password"
//             })
//         }
//         const token = jwt.sign({email:user.userEmail}, secretKey, {expiresIn: "4h"});
//         res.cookie("token", token, {httpOnly:true, secure:true, sameSite:true});
//         res.status(200).json({message: "User logged in successfully", ok:true, isAuthenticated: true, userName:user.userFirstName});
//
//
//     }
//     catch(error){
//         res.status(400).json({message: error.message,})
//     }
// }

async function handleAdminGetUsers(req, res) {
  const users = await userModel.find({});
  successResponse(res, users, undefined, 200);
}

export { handleAdminGetUsers };
