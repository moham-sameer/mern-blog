import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MongoDB is connected")
}).catch((error)=>{
    console.log(error)
})
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend URL
    credentials: true // Allow credentials (cookies) to be sent cross-origin
}));

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    console.log('Cookies:', req.cookies);
    next();
});



app.use((err,req,res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
app.listen(3000,console.log("server is listening on port 3000..."))

