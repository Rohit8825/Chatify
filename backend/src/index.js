import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config()

const app=express()

const PORT=process.env.PORT

app.use(express.json({ limit: "10mb" }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log(`server is ready at ${PORT}`)
    connectDB()
})