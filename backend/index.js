import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is runnning on PORT ${PORT}`);
    
})