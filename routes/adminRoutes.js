import { Router } from "express";
import { 
    showAdminPanel, 
    showAddBookForm, 
    addBook, 
    showEditBookForm, 
    updateBook, 
    deleteBook 
} from "../controllers/adminController.js";
import { viewAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

// Todas las rutas requieren ser administrador
router.get('/admin', verifyAdmin, showAdminPanel);
router.get('/admin/books/new', verifyAdmin, showAddBookForm);
router.post('/admin/books', verifyAdmin, addBook);
router.get('/admin/books/:id/edit', verifyAdmin, showEditBookForm);
router.post('/admin/books/:id/edit', verifyAdmin, updateBook);
router.post('/admin/books/:id/delete', verifyAdmin, deleteBook);

// Rutas de gestión de pedidos
router.get('/admin/pedidos', verifyAdmin, viewAllOrders);
router.post('/admin/pedidos/:id/estado', verifyAdmin, updateOrderStatus);

export default router;
