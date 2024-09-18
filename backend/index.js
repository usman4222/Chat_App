import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoute.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is runnning on PORT ${PORT}`);

})

mongoose.connect(process.env.MONGO_URL,)
    .then(() => {
        console.log("Mongo connected successfully");
    })
    .catch((error) => {
        console.error("Mongo connection error:", error);
    });
