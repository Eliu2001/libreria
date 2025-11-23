import { Book } from "../models/Book";

export const showBooks = async (req, res) => {
    const books = await Book.findAll();
    res.render('books',{ books });
};

export const buyBook = async (req, res) => {
    const id = req.params.id;
    const { quantity } = req.body;

    const book = await Book.findByPk(id);

    if(!book) {
        return res.send('Book not found');
    }
    if(book.quantity_actual < quantity) {
        return res.send('Not enough stock available');
    }
    book.quantity_actual -= quantity;
    await book.save();

    res.redirect('/');
};

