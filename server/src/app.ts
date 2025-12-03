import express from "express";
import cors from "cors"
import { router } from "./routes/Routes";
import { db_connect } from "./config/db";

db_connect()

const app = express()

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
}))

app.use(router)

app.listen(8080, () => {
    console.log("Port:- 8080")
})