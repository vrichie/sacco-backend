import { prisma } from "../../lib/prisma";
import { CreateUser } from "../types";


export const createUser = async (createUser:CreateUser) => {
    const user = await prisma.user.create({
        data:createUser
    })
   return user;

}
export const getAllUsers = async()=>{
    const users=await prisma.user.findMany();
    return users;
}

export const getUserByEmail =async(email:string)=>{
    const user =await prisma.user.findUnique({
        where:{
            email
        }
    });
    return user;
}

export const getUserById = async(id:number) =>{
    const user = await prisma.user.findUnique({
        where:{
            id:id
        }
    })
    return user
}

export const updateUser= async(id:number,data:CreateUser)=>{
    const user=await prisma.user.update({
        where:{
            id
        },
        data
    })
    return user
}

export const deleteUser= async(id:number)=>{
    const user = await prisma.user.delete({
        where:{
            id
        }
    })
    return user
}