import dotenv from "dotenv";
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
import { app } from "./app.js";
import authenticateUser from "./middlewares/authenticate.middleware.js";
import cartRouter from "./routes/cart.router.js";
import authorize from "./middlewares/authorize.middleware.js";
import { handleAdminGetUsers } from "./controllers/admin.controller.js";
import { ROLES } from "./constants.js";

const key = fs.readFileSync("C:\\Users\\rakes\\localhost-key.pem", "utf8");
const cert = fs.readFileSync("C:\\Users\\rakes\\localhost.pem", "utf8");
const credentials = { key: key, cert: cert };

let httpsServer = https.createServer(credentials, app);

connectDB()
  .then(() => {
    httpsServer.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Couldn't connect to MongoDB: ${err}`);
  });

//Uploads folder
const uploadDir = "uploads/";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// app.get("/", (req, res) => {
//   res.json({ message: "Hello from backend" });
// });

// app.post("/admin/logout",authenticateUser, adminRouter);

// const PORT = process.env.PORT;

// httpsServer.listen(PORT, () => {
//   console.log(`Server is up at port ${PORT}`);
// });
