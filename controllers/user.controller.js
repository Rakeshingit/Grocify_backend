import { errorResponse, successResponse } from "../utils/response.js";

const secretKey = process.env.REFRESH_SECRET_KEY;
const saltRounds = process.env.SALT_ROUNDS;

import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hash } from "bcrypt";

async function handleUserRegistration(req, res) {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const isExistingUser = await userModel.findOne({ userEmail: email });
  if (isExistingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashed = await bcrypt.hash(password, saltRounds);

  const insertUser = new userModel({
    userFirstName: firstName,
    userLastName: lastName,
    userEmail: email,
    phoneNumber: phoneNumber,
    userPassword: hashed,
  });

  try {
    const isSaved = await insertUser.save();
    if (isSaved) {
      console.log("User created successfully");
      res.status(200).json({
        success: true,
        message: "User created successfully",
      });
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
    console.error(e);
  }
}

async function handleUserLogIn(req, res) {
  {
    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ userEmail: email });
      if (!user) {
        return errorResponse(res, "Invalid email or password", 400);
        // return res.status(400).json({
        //   message: "Invalid email or password",
        // });
      }
      const isMatch = await bcrypt.compare(password, user.userPassword);
      if (!isMatch) {
        return errorResponse(res, "Invalid email or password", 400);
        // return res.status(400).json({
        //   message: "Invalid email or password",
        // });
      }

      const payload = {
        userEmail: user.userEmail,
        role: user.role,
      };
      //Create a jwt token
      const token = jwt.sign(payload, secretKey, { expiresIn: "10m" });

      //Set jwt in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
      });

      successResponse(
        res,
        { ok: true, isAuthenticated: true, userName: user.userFirstName },
        "User logged in successfully",
        200
      );
      // res.status(200).json({
      //   message: "User logged in successfully",
      //   ok: true,
      //   isAuthenticated: true,
      //   userName: user.userFirstName,
      // });
      console.log(`${user.userFirstName} is logged in`);
    } catch (e) {
      res.status(500).json({ message: `Internal Server Error: ${e.message}` });
    }
  }
}

export { handleUserRegistration, handleUserLogIn };
