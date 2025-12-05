import express from "express";
import cors from "cors"
import { router } from "./routes/Routes";
import { db_connect } from "./config/db";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

dotenv.config()

db_connect()

const app = express()

app.use(cookieParser())

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors({
    // origin: "https://talrn-assignment.netlify.app",
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(router)

app.listen(8080, () => {
    console.log("Port:- 8080")
})