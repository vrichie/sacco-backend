import { UserRole } from "../../generated/prisma/enums";
import { NextFunction, Response } from "express";


// [ADMIN,Manager] list of authorized role

//  "user": {
//             "id": 16,
//             "email": "test4@mail.com",
//             "role": "MEMBER",
//             "iat": 1786040081,
//             "exp": 1786043681
//         }

export const authorize =(...roles:UserRole[])=>{
   return (req:any,res:Response,next:NextFunction)=>{

    console.log("allowed roles:",roles)
    console.log("User role: ",req.user.role)

        if (!req.user){
             return res.status(401).json({
                success:false,
                data:null,
                message:"You need to be authenticated first",
             })
        }

        if (!roles.includes(req.user.role)){
              return res.status(403).json({
                success:false,
                data:null,
                message:"Access denied.",
             })
        }

        next();


    }


}