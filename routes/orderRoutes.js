import { Router } from "express";
import { viewUserOrders, viewAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/auth.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

// Rutas de usuario
router.get('/pedidos', verifyToken, viewUserOrders);

// Rutas de admin
router.get('/admin/pedidos', verifyAdmin, viewAllOrders);
router.post('/admin/pedidos/:id/estado', verifyAdmin, updateOrderStatus);

export default router;
