import express from "express";
import cors from "cors"
import { router } from "./routes/Routes";
import { db_connect } from "./config/db";
import dotenv from "dotenv"

dotenv.config()

db_connect()

const app = express()

app.use(express.json())

app.use(cors({
    origin: process.env.FrontendUrl,
    methods: ["GET", "POST"]
}))

app.use(router)

app.listen(8080, () => {
    console.log("Port:- 8080")
})