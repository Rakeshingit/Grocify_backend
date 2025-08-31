import dotenv from 'dotenv';
dotenv.config();

import fs from "fs";
import https from "https";
// import authenticateUser from "./middlewares/auth";
import uploader from "./middlewares/imageUploader.js";
import productRouter from "./routes/productRouter.js";


// import cartRouter from "./routes/cartRouter.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import createCategoryRouter from "./routes/createCategoryRouter.js";
import connectDB from "./db/index.js";
import {app} from "./app.js"
import authenticateUser from "./middlewares/auth.js";
import cartRouter from "./routes/cartRouter.js";

const key = fs.readFileSync('C:\\Users\\rakes\\localhost-key.pem', 'utf8');
const cert = fs.readFileSync('C:\\Users\\rakes\\localhost.pem', 'utf8');
const credentials = {key: key, cert: cert};

let httpsServer = https.createServer(credentials, app);
connectDB()
    .then(() => {
      httpsServer.listen(process.env.PORT, () => {
        console.log(`Server started at port ${process.env.PORT}`);
      })
    })



app.get("/", (req, res) => {
  res.json({ message: "HI from backend" }).status(200);
});

//Uploads folder
const uploadDir = 'uploads/';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}



app.get("/", (req, res) => {
    res.json({"message": "Hello from backend"})
})

//Routes
app.get("/carts", cartRouter);
app.post("/carts", cartRouter);
app.delete("/delete-cart-item/:id", cartRouter);
app.post("/user-registration", userRouter);

//Log in routes
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

// const PORT = process.env.PORT;

// httpsServer.listen(PORT, () => {
//   console.log(`Server is up at port ${PORT}`);
// });
