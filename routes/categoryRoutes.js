import { Router } from "express";
import { 
    showCategories,
    showAddCategoryForm,
    addCategory,
    showEditCategoryForm,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.get('/admin/categorias', verifyAdmin, showCategories);
router.get('/admin/categorias/new', verifyAdmin, showAddCategoryForm);
router.post('/admin/categorias', verifyAdmin, addCategory);
router.get('/admin/categorias/:id/edit', verifyAdmin, showEditCategoryForm);
router.post('/admin/categorias/:id/edit', verifyAdmin, updateCategory);
router.post('/admin/categorias/:id/delete', verifyAdmin, deleteCategory);

export default router;
