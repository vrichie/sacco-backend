import { Request, Response } from "express";
import * as userService  from "../services/user.service"
import { CreateUser } from "../types";
import bcrypt from "bcrypt";

export const createUser = async (req:Request,res:Response)=>{
try {
    const {email,firstName,lastName,phone, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const user= await userService.createUser({firstName,email,lastName,phone,password:hashedPassword})
    res.status(201).json({data:user,message:"User created successfully"})

} catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong, failed to create user",error})
}
}

export const getUsers = async(req:Request,res:Response) => {
    try {
    const users= await userService.getAllUsers();
    res.status(200).json(users)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong, failed to get users",error})
    }
}
export const getUserByEmail = async(req:Request,res:Response) => {
    try {
        const email= req.params.email as string

        if(!email || email.length<4){
            return res.status(400).json({message:"Check the email"})
        }
        const user = await userService.getUserByEmail(email);
        res.status(200).json({data:user,message:"User found"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong, User not found",error})
    }
}

export const getUserById = async(req:Request,res:Response) => {
    try {
        const id= Number(req.params.id)

        if(id<0){
            return res.status(400).json({message:"Check the id"})
        }
        const user = await userService.getUserById(id);
        res.status(200).json({data:user,message:"User found"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong, User not found",error})
    }
}

export const updateUser = async(req:Request,res:Response) =>{
    try {
        const id= Number(req.params.id)
        const data:CreateUser = req.body;

        const user = await userService.updateUser(id,data);

        res.status(200).json({data:user,message:"User updated successfully"})


    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong, User not updated",error})
    }
}

export const deleteUser = async(req:Request,res:Response)=>{
    try {
        const id= Number(req.params.id)

        const user = await userService.deleteUser(id)

        res.status(204).json({data:user,message:"User deleted successfully"})
       

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong, User not deleted",error})
    }
}