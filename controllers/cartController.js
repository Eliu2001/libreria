import { Cart } from "../models/Cart.js";
import { Book } from "../models/Book.js";
import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { sequelize } from "../config/database.js";

// Ver carrito del usuario
export const viewCart = async (req, res) => {
    try {
        const cartItems = await Cart.findAll({
            where: { userId: req.usuario.id },
            include: [{
                model: Book,
                attributes: ['id', 'nombre', 'autor', 'precio', 'cantidad_disponible']
            }]
        });

        // Calcular total
        let total = 0;
        cartItems.forEach(item => {
            total += parseFloat(item.book.precio) * item.cantidad;
        });

        res.render('cart', { cartItems, total: total.toFixed(2) });
    } catch (error) {
        console.error('Error al ver carrito:', error);
        res.status(500).send('Error al cargar el carrito');
    }
};

// Agregar al carrito
export const addToCart = async (req, res) => {
    try {
        const { bookId, cantidad } = req.body;
        const userId = req.usuario.id;

        // Verificar que el libro existe y tiene stock
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).send('Libro no encontrado');
        }

        if (book.cantidad_disponible < cantidad) {
            return res.status(400).send('Stock insuficiente');
        }

        // Verificar si ya existe en el carrito
        const existingItem = await Cart.findOne({
            where: { userId, bookId }
        });

        if (existingItem) {
            // Actualizar cantidad
            const newQuantity = existingItem.cantidad + parseInt(cantidad);
            if (book.cantidad_disponible < newQuantity) {
                return res.status(400).send('No hay suficiente stock para esa cantidad');
            }
            existingItem.cantidad = newQuantity;
            await existingItem.save();
        } else {
            // Crear nuevo item
            await Cart.create({
                userId,
                bookId,
                cantidad: parseInt(cantidad)
            });
        }

        res.redirect('/libros?agregado=exito');
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).send('Error al agregar al carrito');
    }
};

// Actualizar cantidad en carrito
export const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        const userId = req.usuario.id;

        const cartItem = await Cart.findOne({
            where: { id, userId },
            include: [Book]
        });

        if (!cartItem) {
            return res.status(404).send('Item no encontrado en el carrito');
        }

        if (cartItem.book.cantidad_disponible < cantidad) {
            return res.status(400).send('Stock insuficiente');
        }

        cartItem.cantidad = parseInt(cantidad);
        await cartItem.save();

        res.redirect('/carrito');
    } catch (error) {
        console.error('Error al actualizar carrito:', error);
        res.status(500).send('Error al actualizar el carrito');
    }
};

// Eliminar del carrito
export const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.usuario.id;

        const cartItem = await Cart.findOne({
            where: { id, userId }
        });

        if (!cartItem) {
            return res.status(404).send('Item no encontrado');
        }

        await cartItem.destroy();
        res.redirect('/carrito');
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        res.status(500).send('Error al eliminar del carrito');
    }
};

// Finalizar compra (procesar carrito)
export const checkout = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const userId = req.usuario.id;

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [Book]
        });

        if (cartItems.length === 0) {
            await transaction.rollback();
            return res.status(400).send('El carrito está vacío');
        }

        // Calcular total y verificar stock
        let total = 0;
        for (const item of cartItems) {
            if (item.book.cantidad_disponible < item.cantidad) {
                await transaction.rollback();
                return res.status(400).send(`Stock insuficiente para ${item.book.nombre}`);
            }
            total += parseFloat(item.book.precio) * item.cantidad;
        }

        // Crear la orden
        const order = await Order.create({
            userId,
            total
        }, { transaction });

        // Crear items de la orden y descontar stock
        for (const item of cartItems) {
            // Crear OrderItem
            await OrderItem.create({
                orderId: order.id,
                bookId: item.bookId,
                cantidad: item.cantidad,
                precio_unitario: item.book.precio,
                subtotal: parseFloat(item.book.precio) * item.cantidad
            }, { transaction });

            // Descontar stock
            item.book.cantidad_disponible -= item.cantidad;
            await item.book.save({ transaction });
        }

        // Vaciar carrito
        await Cart.destroy({ where: { userId }, transaction });

        await transaction.commit();
        res.redirect('/pedidos?compra=exitosa');
    } catch (error) {
        await transaction.rollback();
        console.error('Error al procesar compra:', error);
        res.status(500).send('Error al procesar la compra');
    }
};

// Vaciar carrito
export const clearCart = async (req, res) => {
    try {
        const userId = req.usuario.id;
        await Cart.destroy({ where: { userId } });
        res.redirect('/carrito');
    } catch (error) {
        console.error('Error al vaciar carrito:', error);
        res.status(500).send('Error al vaciar el carrito');
    }
};
