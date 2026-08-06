import { NextFunction,Response } from "express";
import jwt from "jsonwebtoken"
import { UserRole } from "../../generated/prisma/enums";

type ReqUser={
                id:number;
                email:string;
                role: UserRole
            }

export const authenticate =(req:any,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
         return res.status(401).json({
            success:false,
            data:null,
            message:"Authentication failed, login first"
        })
    }
    const token= authHeader.split(" ")[1]
    try {
        const decodedUser = jwt.verify(token,process.env.JWT_SECRET!) as ReqUser
        req.user = decodedUser;
        next();  
    } catch (error) {
         return res.status(401).json({
            success:false,
            data:null,
            message:"Authentication failed, invalid token"
        })
    }

}