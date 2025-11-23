import { Router } from "express";
import { showBooks, buyBook } from "../controllers/booksControllers.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.get('/libros', verifyToken, showBooks);
router.post('/libros/:id/comprar', verifyToken, buyBook);

export default router;