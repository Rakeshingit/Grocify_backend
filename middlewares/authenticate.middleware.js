import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";

function authenticateUser(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return errorResponse(res, "No access token found", 401);

  const accessToken = token.split(" ")[1];

  // console.log(token)
  jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, user) => {
    if (err) return errorResponse(res, "Invalid access token", 401);
    req.user = user;
    next();
  });
}

export default authenticateUser;
