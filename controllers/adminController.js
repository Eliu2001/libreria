import { Book } from "../models/Book.js";
import { Category } from "../models/Category.js";

// Mostrar panel de administración con todos los libros
export const showAdminPanel = async (req, res) => {
    const books = await Book.findAll({
        include: [{
            model: Category,
            attributes: ['nombre'],
            through: { attributes: [] }
        }]
    });
    res.render('admin', { books });
};

// Mostrar formulario para agregar libro
export const showAddBookForm = async (req, res) => {
    const categories = await Category.findAll({ order: [['nombre', 'ASC']] });
    res.render('addBook', { categories });
};

// Agregar nuevo libro
export const addBook = async (req, res) => {
    const { nombre, autor, precio, descripcion, cantidad_disponible, categories } = req.body;
    
    const book = await Book.create({ 
        nombre,
        autor,
        precio: parseFloat(precio) || 0,
        descripcion,
        cantidad_disponible: parseInt(cantidad_disponible) || 0 
    });
    
    // Asignar categorías si se seleccionaron
    if (categories) {
        const categoryIds = Array.isArray(categories) ? categories : [categories];
        await book.setCategories(categoryIds);
    }
    
    res.redirect('/admin/inventario');
};

// Mostrar formulario para editar libro
export const showEditBookForm = async (req, res) => {
    const book = await Book.findByPk(req.params.id, {
        include: [{
            model: Category,
            attributes: ['id', 'nombre'],
            through: { attributes: [] }
        }]
    });
    
    if (!book) {
        return res.send('Libro no encontrado');
    }
    
    const allCategories = await Category.findAll({ order: [['nombre', 'ASC']] });
    const bookCategoryIds = book.categories.map(cat => cat.id);
    
    res.render('editBook', { book, categories: allCategories, bookCategoryIds });
};

// Actualizar libro
export const updateBook = async (req, res) => {
    const { nombre, autor, precio, descripcion, imagen_url, cantidad_disponible, categories } = req.body;
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
        return res.send('Libro no encontrado');
    }
    
    book.nombre = nombre;
    book.autor = autor;
    book.precio = parseFloat(precio) || 0;
    book.descripcion = descripcion;
    book.imagen_url = imagen_url;
    book.cantidad_disponible = parseInt(cantidad_disponible);
    await book.save();
    
    // Actualizar categorías
    if (categories) {
        const categoryIds = Array.isArray(categories) ? categories : [categories];
        await book.setCategories(categoryIds);
    } else {
        await book.setCategories([]);
    }
    
    res.redirect('/admin/inventario');
};

// Eliminar libro
export const deleteBook = async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
        return res.send('Libro no encontrado');
    }
    
    await book.destroy();
    res.redirect('/admin/inventario');
};
