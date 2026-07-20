import { Router } from "express";
import { createUser, deleteUser, getUserByEmail, getUserById, getUsers, updateUser } from "../controllers/user.controller";

const router =Router();

router.post("/",createUser)
router.get("/",getUsers)
router.get("/:id",getUserById)
router.get("/email/:email",getUserByEmail)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)

export default router