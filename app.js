import express from "express";
import body_Parser from "body-parser";
import cookie_parser from "cookie-parser";
import path from "path";
import cors from "cors";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(body_Parser.json({limit: '26kb'}));
app.use(body_Parser.urlencoded({ extended: true, limit: '26kb' }));
app.use('/uploads', express.static('uploads'));
app.use(cookie_parser());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "views")));
//CORS Configuration
app.use(cors({
    origin: 'https://localhost:3000', // Frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
}));

export { app }
