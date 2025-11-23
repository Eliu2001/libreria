import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { Book } from "../models/Book.js";
import { User } from "../models/User.js";

// Ver pedidos del usuario
export const viewUserOrders = async (req, res) => {
    try {
        const userId = req.usuario.id;
        const compra = req.query.compra;

        const orders = await Order.findAll({
            where: { userId },
            include: [{
                model: OrderItem,
                include: [Book]
            }],
            order: [['createdAt', 'DESC']]
        });

        res.render('orders', { orders, compra });
    } catch (error) {
        console.error('Error al ver pedidos:', error);
        res.status(500).send('Error al cargar los pedidos');
    }
};

// Ver todos los pedidos (Admin)
export const viewAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: OrderItem,
                    include: [Book]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.render('adminOrders', { orders });
    } catch (error) {
        console.error('Error al ver pedidos:', error);
        res.status(500).send('Error al cargar los pedidos');
    }
};

// Cambiar estado de pedido (Admin)
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).send('Pedido no encontrado');
        }

        order.estado = estado;
        await order.save();

        res.redirect('/admin/pedidos');
    } catch (error) {
        console.error('Error al actualizar pedido:', error);
        res.status(500).send('Error al actualizar el pedido');
    }
};
