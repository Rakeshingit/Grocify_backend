import { errorResponse, successResponse } from "../utils/response.js";

const refreshSecretKey = process.env.REFRESH_SECRET_KEY;
const accessSecretKay = process.env.ACCESS_SECRET_KEY;
const saltRounds = process.env.SALT_ROUNDS;

import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleUserRegistration = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const isExistingUser = await userModel.findOne({ userEmail: email });
  if (isExistingUser) {
    return errorResponse(res, "User already exists", 409);
    // return res.status(400).json({
    //   success: false,
    //   message: "User already exists",
    // });
  }

  const hashed = await bcrypt.hash(password, saltRounds);

  const insertUser = new userModel({
    userFirstName: firstName,
    userLastName: lastName,
    userEmail: email,
    phoneNumber: phoneNumber,
    userPassword: hashed,
  });
  const isSaved = await insertUser.save();
  if (isSaved) {
    console.log("User created successfully");
    successResponse(res, "", "User created successfully", 201);
    // res.status(200).json({
    //   success: true,
    //   message: "User created successfully",
    // });
  }
};

const handleUserLogIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return errorResponse(res, "No Email or password provided!!", 400);

  const user = await userModel.findOne({ userEmail: email });
  if (!user) return errorResponse(res, "Invalid email or password", 400);

  const isMatch = await bcrypt.compare(password, user.userPassword);
  if (!isMatch) return errorResponse(res, "Invalid email or password", 400);

  //Payloads
  const accessTokenPayload = {
    userEmail: user.userEmail,
    role: user.role,
  };

  const refreshTokenPayload = {
    userEmail: user.userEmail,
  };

  //Create a jwt token
  const RefreshToken = jwt.sign(refreshTokenPayload, refreshSecretKey, { expiresIn: "7d" });
  const accessToken = jwt.sign(accessTokenPayload, accessSecretKay, { expiresIn: "30m" });

  //Set jwt in cookie
  res.cookie("token", RefreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
  });

  successResponse(
    res,
    { ok: true, isAuthenticated: true, userName: user.userFirstName, accessToken },
    "User logged in successfully",
    200
  );
  console.log(`${user.userFirstName} is logged in`);
};

const handleAccessTokenReissue = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return errorResponse(res, "Token not found", 401);

  jwt.verify(token, refreshSecretKey, (err, user) => {
    if (err) return errorResponse(res, "Invalid token", 401);
    const accessTokenPayload = {
      userEmail: user.userEmail,
      role: user.role,
    };
    const accessToken = jwt.sign(accessTokenPayload, accessSecretKay, { expiresIn: "30m" });
    successResponse(res, { accessToken, message: "New access token generated successfully" }, 200);
  });
};
export { handleUserRegistration, handleUserLogIn, handleAccessTokenReissue };
