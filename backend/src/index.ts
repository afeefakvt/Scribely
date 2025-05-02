import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes'

dotenv.config()

const app = express()

connectDB()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',userRoutes)


const port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})