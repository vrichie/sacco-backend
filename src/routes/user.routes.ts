import { Router } from "express";
import { createUser, deleteUser, getUserByEmail, getUserById, getUsers, updateUser } from "../controllers/user.controller";
import { authenticate } from "../middleware/authenticate.middlewar";
import { authorize } from "../middleware/authorize.middleware";
import { UserRole } from "../../generated/prisma/enums";

const router =Router();

router.post("/",authenticate,authorize(UserRole.ADMIN),createUser)
router.get("/",authenticate,authorize(UserRole.ADMIN),getUsers)
router.get("/:id",authenticate,authorize(UserRole.ADMIN),getUserById)
router.get("/email/:email",authenticate,authorize(UserRole.ADMIN),getUserByEmail)
router.put("/:id",authenticate,updateUser)
router.delete("/:id",authenticate,authorize(UserRole.ADMIN),deleteUser)

export default router