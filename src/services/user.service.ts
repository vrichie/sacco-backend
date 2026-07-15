import { prisma } from "../../lib/prisma";

type CreateUser ={
    email:string;
    firstName:string;
    lastName:string;
    phone?:string;
}

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
