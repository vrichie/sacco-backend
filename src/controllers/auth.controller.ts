import { Response,Request } from "express"
import * as authService from "../services/auth.service"
import * as userService from "../services/user.service"
import bcrypt from "bcrypt"

export const register=async(req:Request,res:Response)=>{
try {
    const {email,firstName,lastName,phone, password} = req.body;
    const user= await authService.register({firstName,email,lastName,phone,password})
    res.status(201).json({data:user,message:"Account created successfully"})

} catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong, failed to create account",error})
}
}

export const login=async(req:Request,res:Response)=>{
    try {
        const {email,password}=req.body;
        const userExist=await userService.getUserByEmail(email);
   
        if(!userExist){
            return res.status(400).json({message:"User not found"})
        }

        const validPassword= await bcrypt.compare(password,userExist.password)
        if(!validPassword){
            return res.status(400).json({message:"Wrong password"})
        }

        res.status(200).json({data:userExist,message:"Login successful"})


    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong, failed to Login",error})
    }
}