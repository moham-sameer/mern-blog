import User from "../model/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from "../utils/error.js"
export const signup = async(req,res)=>{
    try {
        const {username,email,password} = req.body
        const hashedPassword = bcryptjs.hashSync(password,10)
        const data = new User({username,email,password:hashedPassword})
        const result = await data.save()
        res.send(result)
        console.log(result)
    } catch (error) {
        console.log(error)
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
        console.log(error)
    }
}