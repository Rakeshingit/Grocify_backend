// require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

// const mongoose = require("mongoose");
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function handleAdminLogin(req, res) {
    const {userName, password} = req.body;

    try{
        const user = await userModel.findOne({userName:userName});
        if(!user){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(password, user.userPassword);
        console.log(isMatch)
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const token = jwt.sign({email:user.userEmail}, secretKey, {expiresIn: "4h"});
        console.log(token);
        res.cookie("token", token, {httpOnly:true, secure:true, sameSite:true});
        res.status(200).json({message: "User logged in successfully", ok:true, isAuthenticated: true, userName:user.userFirstName});


    }
    catch(error){
        res.status(400).json({message: error.message,})
    }
}

async function handleAdminLogout(req, res){
    res.clearCookie("token",{
        path: '/',
        sameSite: 'Strict',
        httpOnly: true,
        secure:true
    })
        .status(200).json({message: "User logged out successfully"});
    console.log("User logged out successfully")
}

async function handleAdminGetUsers(req, res){
    try{
        const users = await userModel.find({});
        res.status(200).json(users);
    }catch(error){
        console.log(error);
    }
}

export {
    handleAdminLogin,
    handleAdminGetUsers,
    handleAdminLogout
}