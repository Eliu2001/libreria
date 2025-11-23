import { Book } from "../models/Book.js";

// Mostrar panel de administración con todos los libros
export const showAdminPanel = async (req, res) => {
    const books = await Book.findAll();
    res.render('admin', { books });
};

// Mostrar formulario para agregar libro
export const showAddBookForm = (req, res) => {
    res.render('addBook');
};

// Agregar nuevo libro
export const addBook = async (req, res) => {
    const { nombre, cantidad_disponible } = req.body;
    
    await Book.create({ 
        nombre, 
        cantidad_disponible: parseInt(cantidad_disponible) || 0 
    });
    
    res.redirect('/admin');
};

// Mostrar formulario para editar libro
export const showEditBookForm = async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
        return res.send('Libro no encontrado');
    }
    
    res.render('editBook', { book });
};

// Actualizar libro
export const updateBook = async (req, res) => {
    const { nombre, cantidad_disponible } = req.body;
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
        return res.send('Libro no encontrado');
    }
    
    book.nombre = nombre;
    book.cantidad_disponible = parseInt(cantidad_disponible);
    await book.save();
    
    res.redirect('/admin');
};

// Eliminar libro
export const deleteBook = async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
        return res.send('Libro no encontrado');
    }
    
    await book.destroy();
    res.redirect('/admin');
};
