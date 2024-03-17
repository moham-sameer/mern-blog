import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cors from 'cors'
dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MongoDB is connected")
}).catch((error)=>{
    console.log(error)
})
const app = express()
app.use(cors())

app.use(express.json())
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use((error,req,res, next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
app.listen(3000,console.log("server is listening on port 3000..."))

