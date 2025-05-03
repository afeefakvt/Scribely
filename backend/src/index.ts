import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes'
import blogRoutes from './routes/blogRoutes';
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()

connectDB()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use('/api',userRoutes)
app.use('/api',blogRoutes)


const port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})