import e from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import jwt from 'jsonwebtoken';

import { connectDB, sequelize } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import booksRoutes from './routes/booksRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = e();
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(e.static("public"));

app.engine("hbs", exphbs.engine({ 
    extname: ".hbs",
    helpers: {
        eq: (a, b) => a === b
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set("view engine", "hbs");

// Middleware para pasar usuario a todas las vistas
app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const usuario = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.usuario = usuario;
        } catch (error) {
            res.locals.usuario = null;
        }
    } else {
        res.locals.usuario = null;
    }
    next();
});

app.use(authRoutes);
app.use(booksRoutes);
app.use(adminRoutes);

app.get("/", (req, res) => res.render("home"));

await connectDB();
await sequelize.sync();

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor arriba en puerto 3000");
});