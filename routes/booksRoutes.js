import { Router } from "express";
import { showBooks, buyBook } from "../controllers/bookController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.get('/books', verifyToken, showBooks);
router.post('/books/:id/buy', verifyToken, buyBook);