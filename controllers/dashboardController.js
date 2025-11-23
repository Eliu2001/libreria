import { User } from "../models/User.js";
import { Book } from "../models/Book.js";
import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { sequelize } from "../config/database.js";

export const showDashboard = async (req, res) => {
    try {
        // Total de usuarios registrados
        const totalUsuarios = await User.count();

        // Total de pedidos por estado
        const pedidosPorEstado = await Order.findAll({
            attributes: [
                'estado',
                [sequelize.fn('COUNT', sequelize.col('id')), 'cantidad']
            ],
            group: ['estado']
        });

        const estadisticas = {
            pendientes: 0,
            completados: 0,
            cancelados: 0
        };

        pedidosPorEstado.forEach(pedido => {
            const cantidad = parseInt(pedido.dataValues.cantidad);
            if (pedido.estado === 'pendiente') estadisticas.pendientes = cantidad;
            if (pedido.estado === 'completado') estadisticas.completados = cantidad;
            if (pedido.estado === 'cancelado') estadisticas.cancelados = cantidad;
        });

        // Ingresos totales (solo pedidos completados)
        const ingresosResult = await Order.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('total')), 'ingresos']
            ],
            where: { estado: 'completado' }
        });

        const ingresosTotales = parseFloat(ingresosResult?.dataValues?.ingresos || 0);

        // Libro más vendido
        let topLibro = null;
        
        try {
            const libroMasVendidoData = await sequelize.query(`
                SELECT oi."bookId", SUM(oi.cantidad) as total_vendido, b.nombre, b.autor
                FROM "orderItems" oi
                JOIN books b ON oi."bookId" = b.id
                GROUP BY oi."bookId", b.nombre, b.autor
                ORDER BY total_vendido DESC
                LIMIT 1
            `, { type: sequelize.QueryTypes.SELECT });

            if (libroMasVendidoData && libroMasVendidoData.length > 0) {
                topLibro = {
                    nombre: libroMasVendidoData[0].nombre,
                    autor: libroMasVendidoData[0].autor,
                    vendidos: parseInt(libroMasVendidoData[0].total_vendido)
                };
            }
        } catch (error) {
            console.error('Error al obtener libro más vendido:', error);
            topLibro = null;
        }

        // Ventas de los últimos 7 días
        const hace7Dias = new Date();
        hace7Dias.setDate(hace7Dias.getDate() - 7);

        const ventasPorDia = await Order.findAll({
            attributes: [
                [sequelize.fn('DATE', sequelize.col('createdAt')), 'fecha'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'cantidad'],
                [sequelize.fn('SUM', sequelize.col('total')), 'total']
            ],
            where: {
                createdAt: {
                    [sequelize.Sequelize.Op.gte]: hace7Dias
                },
                estado: 'completado'
            },
            group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
            order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']]
        });

        // Formatear datos para Chart.js
        const labels = [];
        const ventasData = [];
        const ingresosData = [];

        ventasPorDia.forEach(venta => {
            const fecha = new Date(venta.dataValues.fecha);
            labels.push(fecha.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }));
            ventasData.push(parseInt(venta.dataValues.cantidad));
            ingresosData.push(parseFloat(venta.dataValues.total));
        });

        res.render('dashboard', {
            totalUsuarios,
            estadisticas,
            ingresosTotales: ingresosTotales.toFixed(2),
            topLibro,
            ventasChart: {
                labels: JSON.stringify(labels),
                ventas: JSON.stringify(ventasData),
                ingresos: JSON.stringify(ingresosData)
            }
        });
    } catch (error) {
        console.error('Error al cargar dashboard:', error);
        res.status(500).send('Error al cargar el dashboard');
    }
};
