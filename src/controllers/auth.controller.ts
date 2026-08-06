import { Response,Request } from "express"
import * as authService from "../services/auth.service"
import * as userService from "../services/user.service"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const register=async(req:Request,res:Response)=>{
try {
    const {email,firstName,lastName,phone, password} = req.body;
    // check if email is taken
    const isEmailTaken = await userService.getUserByEmail(email);
    if(isEmailTaken){
        return res.status(400).json({
            success:false,
            data:null,
            message:"Email is already taken"
        })
    }
    const user= await authService.register({firstName,email,lastName,phone,password})
    const token= jwt.sign({id:user.id,email:user.email,role:user.role},process.env.JWT_SECRET!,{
        expiresIn:"1h"
    })
    res.status(201).json({
        success:true,
        data:{user,token},
        message:"Account created successfully"
    })

} catch (error) {
    console.log(error)
     res.status(500).json({
            success:false,
            data:{error},
            message:"Something went wrong, failed to Login"
        })
}
}

export const login=async(req:Request,res:Response)=>{
    try {
        const {email,password}=req.body;
        const userExist=await userService.getUserByEmail(email);

        if(!userExist){
            return res.status(400).json({
                success:false,
                data:null,
                message:"User not found"
            })
        }
        const validPassword= await bcrypt.compare(password,userExist.password)
        if(!validPassword){
            return res.status(400).json({
                success:false,
                data:null,
                message:"Wrong password"
            })
        }
        const token= jwt.sign({id:userExist.id,email:userExist.email,role:userExist.role},process.env.JWT_SECRET!,{
        expiresIn:"1h"
         })

        res.status(200).json({
            success:true,
            data:{
                user:userExist,
                token
            },
            message:"Login successful"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            data:{error},
            message:"Something went wrong, failed to Login"
        })
    }
}