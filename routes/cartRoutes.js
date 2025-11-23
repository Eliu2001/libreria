import { Router } from "express";
import { 
    viewCart, 
    addToCart, 
    updateCartItem, 
    removeFromCart, 
    checkout,
    clearCart 
} from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

// Todas las rutas requieren autenticación
router.get('/carrito', verifyToken, viewCart);
router.post('/carrito/agregar', verifyToken, addToCart);
router.post('/carrito/:id/actualizar', verifyToken, updateCartItem);
router.post('/carrito/:id/eliminar', verifyToken, removeFromCart);
router.post('/carrito/finalizar', verifyToken, checkout);
router.post('/carrito/vaciar', verifyToken, clearCart);

export default router;
