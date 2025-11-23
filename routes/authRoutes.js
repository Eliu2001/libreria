import { Router } from "express";
import { showLogin, showRegister, register, login, logout } from "../controllers/authController.js";

const router = Router();

router.get("/login", showLogin);
router.post("/login", login);

router.get("/register", showRegister);
router.post("/register", register);
router.get("/logout", logout);

export default router;