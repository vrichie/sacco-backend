import { Request, Response } from "express";
import * as userService  from "../services/user.service"

export const createUser = async (req:Request,res:Response)=>{
try {
    const {email,firstName,lastName,phone} = req.body;
    
    const user= await userService.createUser({firstName,email,lastName,phone})
    res.status(201).json(user)

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