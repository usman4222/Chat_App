import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoute.js"
import userRoutes from "./routes/UserRoutes.js"
import contactsRoutes from "./routes/ContactRoute.js"
import setupSocket from "./socket.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use("/uploads/profiles", express.static("uploads/profiles"))
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/contacts', contactsRoutes)


const server = app.listen(PORT, () => {
    console.log(`Server is runnning on PORT ${PORT}`);

})

setupSocket(server)

mongoose.connect(process.env.MONGO_URL,)
    .then(() => {
        console.log("Mongo connected successfully");
    })
    .catch((error) => {
        console.error("Mongo connection error:", error);
    });
