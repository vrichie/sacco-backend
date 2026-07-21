import { prisma } from "../../lib/prisma";
import { CreateUser } from "../types";
import bcrypt from "bcrypt"


export const register = async (registerUser:CreateUser)=>{
    const hashedPassword = await bcrypt.hash(registerUser.password,10);
    const user = await prisma.user.create({
        data:{
            firstName:registerUser.firstName,
            lastName:registerUser.lastName,
            email:registerUser.email,
            phone:registerUser.phone,
            password:hashedPassword
        }
    })
    return user;
}