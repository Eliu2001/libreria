import { Book } from "../models/Book.js";

export const showBooks = async (req, res) => {
    const books = await Book.findAll();
    const agregado = req.query.agregado;
    res.render('books', { books, agregado });
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

