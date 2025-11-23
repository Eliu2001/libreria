import e from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';

import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes.js';
import booksRoutes from './routes/booksRoutes.js';

dotenv.config();

const app = e();
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(e.static("public"));

app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(authRoutes);
app.use(booksRoutes);

app.get("/", (req, res) => res.render("home"));

await connectDB();
await sequelize.sync();

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor arriba en puerto 3000");
});