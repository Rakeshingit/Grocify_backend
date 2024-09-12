const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const body_Parser = require("body-parser");
const cookie_parser = require("cookie-parser")
const { error } = require("console");
const { strict } = require("assert");
const { type } = require("os");
const cartRouter = require("./routes/cartRouter");
const userRouter = require("./routes/userRouter")

// Database
const uri = "mongodb://127.0.0.1:27017/Grocify-DB";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.error("Couldn't connect to the Database", error));


const app = express();
app.use(body_Parser.json());// Parse JSON bodies
app.use(cookie_parser());
app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, "views")));
app.get("/", (req, res) => {
  res.json({ message: "HI from backend" }).status(200);
});


//CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Allow credentials (cookies) to be sent
}));

//Routes
app.get("/carts", cartRouter);
app.post("/carts", cartRouter);
app.delete("/delete-cart-item/:id", cartRouter);
app.post("/user-registration", userRouter);
app.post("/user-login", userRouter);

const PORT = 8901;

app.listen(PORT, () => {
  console.log(`Server is up at port ${PORT}`);
});
