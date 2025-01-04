require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const saltRounds = process.env.SALT_ROUNDS;

const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {hash} = require("bcrypt");


async function handleUserRegistration(req, res){
    const {firstName, lastName, email, phoneNumber, password} = req.body;
    const isExistingUser = await userModel.findOne({userEmail:email});
    if(isExistingUser){
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }

    const hashed = await bcrypt.hash(password, saltRounds)

    const insertUser = new userModel({
        userFirstName: firstName,
        userLastName: lastName,
        userEmail: email,
        phoneNumber: phoneNumber,
        userPassword: hashed,
    });

    try{
        const isSaved = await insertUser.save();
        if(isSaved){
            console.log("User created successfully");
            res.status(200).json({
                success: true,
                message: "User created successfully"
            });
        }
    }catch(e){
        res.status(400).json({
            success: false,
            message: e.message,
        })
        console.error(e);
    }
}

async function handleUserLogIn(req, res){{
    const {email, password} = req.body;
    //console.log(email, password);

    try{
        const user = await userModel.findOne({userEmail:email});
        if(!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(password, user.userPassword);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        //Create a jwt token
        const token = jwt.sign({email:user.userEmail},secretKey);

        //Set jwt in cookie
        res.cookie("token", token, {httpOnly:true,secure:true, domain:"localhost",path:"/", sameSite:"none"});
        res.status(200).json({message: "User logged in successfully", ok:true, isAuthenticated: true, userName:user.userFirstName});
        console.log(`${user.userFirstName} is logged in`);
    }catch(e){
        res.status(400).json({message: e.message,})
    }
}}

module.exports = {
    handleUserRegistration,
    handleUserLogIn
}