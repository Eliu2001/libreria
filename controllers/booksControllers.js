import { Book } from "../models/Book.js";
import { Category } from "../models/Category.js";
import { sequelize } from "../config/database.js";

export const showBooks = async (req, res) => {
    try {
        const agregado = req.query.agregado;
        const searchTerm = req.query.search || '';
        const categoryId = req.query.category || '';

        let whereClause = {};
        let includeCategories = {
            model: Category,
            attributes: ['id', 'nombre'],
            through: { attributes: [] }
        };
        
        if (searchTerm) {
            // Buscar por nombre o autor usando ILIKE (case insensitive)
            whereClause = {
                [sequelize.Sequelize.Op.or]: [
                    { nombre: { [sequelize.Sequelize.Op.iLike]: `%${searchTerm}%` } },
                    { autor: { [sequelize.Sequelize.Op.iLike]: `%${searchTerm}%` } }
                ]
            };
        }

        // Si hay filtro de categoría
        if (categoryId) {
            includeCategories.where = { id: categoryId };
            includeCategories.required = true;
        }

        const books = await Book.findAll({ 
            where: whereClause,
            include: [includeCategories]
        });

        // Obtener todas las categorías para el filtro
        const allCategories = await Category.findAll({ order: [['nombre', 'ASC']] });

        res.render('books', { 
            books, 
            agregado,
            searchTerm,
            categoryId,
            categories: allCategories,
            resultCount: books.length,
            isSearching: searchTerm.length > 0 || categoryId.length > 0
        });
    } catch (error) {
        console.error('Error al mostrar libros:', error);
        res.status(500).send('Error al cargar los libros');
    }
};

export const buyBook = async (req, res) => {
    const id = req.params.id;
    const { cantidad } = req.body;

    const book = await Book.findByPk(id);

    if(!book) {
        return res.send('Book not found');
    }
    if(book.cantidad_disponible < cantidad) {
        return res.send('Not enough stock available');
    }
    book.cantidad_disponible -= cantidad;
    await book.save();

    res.redirect('/');
};

