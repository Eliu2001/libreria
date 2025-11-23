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
    const { nombre, autor, precio, descripcion, cantidad_disponible } = req.body;
    
    await Book.create({ 
        nombre,
        autor,
        precio: parseFloat(precio) || 0,
        descripcion,
        cantidad_disponible: parseInt(cantidad_disponible) || 0 
    });
    
    res.redirect('/admin/inventario');
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
    const { nombre, autor, precio, descripcion, imagen_url, cantidad_disponible } = req.body;
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
