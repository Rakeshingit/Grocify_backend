import dotenv from 'dotenv';
dotenv.config();

import fs from "fs";
import https from "https";
import uploader from "./middlewares/imageUploader.middleware.js";
import productRouter from "./routes/product.router.js";


// import cartRouter from "./routes/cart.router.js";
import authRouter from "./routes/auth.router.js";
import adminRouter from "./routes/admin.router.js";
import categoryRouter from "./routes/category.router.js";
import connectDB from "./db/index.js";
import {app} from "./app.js"
import authenticateUser from "./middlewares/authenticate.middleware.js";
import cartRouter from "./routes/cart.router.js";
import authorize from "./middlewares/authorize.middleware.js";
import {handleAdminGetUsers} from "./controllers/admin.controller.js";
import {ROLES} from "./constants.js";

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
app.post("/user-registration", authRouter);

//Auth routes
app.use("/api/v1/auth", authRouter);
// app.post("/login", authRouter);
// app.post("/admin/login", adminRouter);

//Categories routes
app.post("/admin/create-category", categoryRouter);
app.post("/admin/create-subcategory", categoryRouter);
app.get("/get-subcategories", authenticateUser, categoryRouter);

//Product routes
app.post("/admin/create-product", authenticateUser, uploader.array('productImg', 8),  productRouter);
app.get("/get-products", authenticateUser, productRouter);

//User Routes
app.get("/admin/get-users", authenticateUser, authorize([ROLES.ADMIN]), handleAdminGetUsers);
// app.post("/admin/logout",authenticateUser, adminRouter);

// const PORT = process.env.PORT;

// httpsServer.listen(PORT, () => {
//   console.log(`Server is up at port ${PORT}`);
// });