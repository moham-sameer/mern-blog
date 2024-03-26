import User from "../model/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from "../utils/error.js"
export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body
    if(!username || !email || !password || username === ''|| email === '' || password === ''){
        next(errorHandler(400,'All fields are required'))
    }
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username,email,password:hashedPassword})
    try {
           await newUser.save()
        res.json('Signup successful')

    } catch (error) {
        next(error)
    }
}
export const signin = async(req,res,next)=>{
    const {email,password} = req.body
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404,"User not found"))
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(errorHandler(400,"Wrong Credentials"))
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET_KEY)
        const {password:forsecurity,...rest} = validUser._doc
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}