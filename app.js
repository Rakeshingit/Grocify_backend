import express from "express";
import body_Parser from "body-parser";
import cookie_parser from "cookie-parser";
import path from "path";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { globalErrorHandler } from "./utils/errorHandler.js";
import cartRouter from "./routes/cart.router.js";
import authRouter from "./routes/auth.router.js";
import categoryRouter from "./routes/category.router.js";
import authenticateUser from "./middlewares/authenticate.middleware.js";
import uploader from "./middlewares/imageUploader.middleware.js";
import productRouter from "./routes/product.router.js";
import authorize from "./middlewares/authorize.middleware.js";
import { handleAdminGetUsers } from "./controllers/admin.controller.js";
import { ROLES } from "./constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(body_Parser.json({ limit: "26kb" }));
app.use(body_Parser.urlencoded({ extended: true, limit: "26kb" }));
app.use("/uploads", express.static("uploads"));
app.use(cookie_parser());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "views")));

//CORS Configuration
app.use(
  cors({
    origin: "https://localhost:3000", // Frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

app.get("/", (req, res) => {
  res.json({ message: "HI from backend" }).status(200);
});

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
app.post(
  "/admin/create-product",
  authenticateUser,
  uploader.array("productImg", 8),
  productRouter
);
app.get("/get-products", authenticateUser, productRouter);

//User Routes
app.get(
  "/admin/get-users",
  authenticateUser,
  authorize([ROLES.ADMIN]),
  handleAdminGetUsers
);

//For handling global errors
app.use(globalErrorHandler);

export { app };
