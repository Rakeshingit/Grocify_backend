import jwt from "jsonwebtoken";

function authenticateUser(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ error: "No access token not found" });
  }

  const accessToken = token.split(" ")[1];

  // console.log(token)
  jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Unauthorized");
    req.user = user;
    next();
  });
}

export default authenticateUser;
