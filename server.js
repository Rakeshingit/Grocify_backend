const express = require("express");
const fs = require("fs");
const https = require("https");
const authenticateUser = require("./middlewares/auth");
const path = require("path");
const uploader = require("./middlewares/imageUploader");
const productRouter = require("./routes/productRouter");
const cors = require("cors");
const mongoose = require("mongoose");
const body_Parser = require("body-parser");
const cookie_parser = require("cookie-parser")
const cartRouter = require("./routes/cartRouter");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const createCategoryRouter = require("./routes/createCategoryRouter");

// Database
const uri = "mongodb://127.0.0.1:27017/Grocify-DB";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.error("Couldn't connect to the Database", error));


const app = express();

const key = fs.readFileSync('C:\\Users\\rakes\\localhost-key.pem', 'utf8');
const cert = fs.readFileSync('C:\\Users\\rakes\\localhost.pem', 'utf8');
const credentials = {key: key, cert: cert};

let httpsServer = https.createServer(credentials, app);

app.use(body_Parser.json({limit: '10mb'}));// Parse JSON bodies
app.use(body_Parser.urlencoded({ extended: true, limit: '10mb' }));
// app.use('/uploads', express.static('uploads'));
app.use(cookie_parser());
app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, "views")));
app.get("/", (req, res) => {
  res.json({ message: "HI from backend" }).status(200);
});

//Uploads folder
const uploadDir = 'uploads/';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


//CORS Configuration
app.use(cors({
  origin: 'https://localhost:3000', // Frontend URL
  credentials: true, // Allow credentials (cookies) to be sent
}));

//Routes
app.get("/carts", cartRouter);
app.post("/carts", cartRouter);
app.delete("/delete-cart-item/:id", cartRouter);
app.post("/user-registration", userRouter);

//log in routes
app.post("/login", userRouter);
app.post("/admin/login", adminRouter);

//Categories routes
app.post("/admin/create-category", createCategoryRouter);
app.post("/admin/create-subcategory", createCategoryRouter);
app.get("/get-subcategories", authenticateUser, createCategoryRouter);

//Product routes
app.post("/admin/create-product", authenticateUser, uploader.array('productImg', 8),  productRouter);
app.get("/get-products", productRouter);

//User Routes
app.get("/admin/get-users", authenticateUser, adminRouter);
app.post("/admin/logout",authenticateUser, adminRouter);

const PORT = process.env.PORT;

httpsServer.listen(PORT, () => {
  console.log(`Server is up at port ${PORT}`);
});
