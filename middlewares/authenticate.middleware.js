import jwt from "jsonwebtoken";

function authenticateUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    console.log("Token not found");
    return res.status(401).send({ error: "Token not found" });
  }

  // console.log(token)
  jwt.verify(token, process.env.REFRESH_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Unauthorized");
    req.user = user;
    next();
  });
}

export default authenticateUser;
