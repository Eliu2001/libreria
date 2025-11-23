import e from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import jwt from 'jsonwebtoken';

import { connectDB, sequelize } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import booksRoutes from './routes/booksRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

// Importar modelos
import { User } from './models/User.js';
import { Book } from './models/Book.js';
import { Cart } from './models/Cart.js';
import { Order } from './models/Order.js';
import { OrderItem } from './models/OrderItem.js';
import { Category } from './models/Category.js';
import { BookCategory } from './models/BookCategory.js';

// Definir relaciones después de importar todos los modelos
// Relaciones User
User.hasMany(Cart, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

// Relaciones Book
Book.hasMany(Cart, { foreignKey: 'bookId' });

// Relaciones Cart
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Book, { foreignKey: 'bookId' });

// Relaciones Order
Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

// Relaciones OrderItem
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Book, { foreignKey: 'bookId' });

// Relaciones Category - Book (Muchos a Muchos)
Book.belongsToMany(Category, { through: BookCategory, foreignKey: 'bookId' });
Category.belongsToMany(Book, { through: BookCategory, foreignKey: 'categoryId' });

dotenv.config();

const app = e();
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(e.static("public"));

app.engine("hbs", exphbs.engine({ 
    extname: ".hbs",
    helpers: {
        eq: (a, b) => a === b,
        gt: (a, b) => a > b,
        includes: (array, value) => array && array.includes(value),
        toString: (value) => String(value)
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set("view engine", "hbs");

// Middleware para pasar usuario y contador de carrito a todas las vistas
app.use(async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const usuario = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.usuario = usuario;
            
            // Contar items en el carrito
            const cartCount = await Cart.count({ where: { userId: usuario.id } });
            res.locals.cartCount = cartCount;
        } catch (error) {
            res.locals.usuario = null;
            res.locals.cartCount = 0;
        }
    } else {
        res.locals.usuario = null;
        res.locals.cartCount = 0;
    }
    next();
});

app.use(authRoutes);
app.use(booksRoutes);
app.use(adminRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(categoryRoutes);

app.get("/", (req, res) => res.render("home"));

await connectDB();
await sequelize.sync();

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor arriba en puerto 3000");
});