import { Category } from "../models/Category.js";

// Ver todas las categorías
export const showCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({ order: [['nombre', 'ASC']] });
        res.render('categories', { categories });
    } catch (error) {
        console.error('Error al cargar categorías:', error);
        res.status(500).send('Error al cargar las categorías');
    }
};

// Mostrar formulario para crear categoría
export const showAddCategoryForm = (req, res) => {
    res.render('addCategory');
};

// Crear categoría
export const addCategory = async (req, res) => {
    try {
        const { nombre } = req.body;
        await Category.create({ nombre });
        res.redirect('/admin/categorias');
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).send('Error al crear la categoría');
    }
};

// Mostrar formulario para editar categoría
export const showEditCategoryForm = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).send('Categoría no encontrada');
        }
        res.render('editCategory', { category });
    } catch (error) {
        console.error('Error al cargar categoría:', error);
        res.status(500).send('Error al cargar la categoría');
    }
};

// Actualizar categoría
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).send('Categoría no encontrada');
        }
        
        category.nombre = nombre;
        await category.save();
        
        res.redirect('/admin/categorias');
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).send('Error al actualizar la categoría');
    }
};

// Eliminar categoría
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).send('Categoría no encontrada');
        }
        
        await category.destroy();
        res.redirect('/admin/categorias');
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).send('Error al eliminar la categoría');
    }
};
