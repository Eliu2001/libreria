import bcrypt from 'bcryptjs';
import { connectDB, sequelize } from './config/database.js';
import { User } from './models/User.js';
import { Book } from './models/Book.js';
import { Cart } from './models/Cart.js';
import { Order } from './models/Order.js';
import { OrderItem } from './models/OrderItem.js';
import { Category } from './models/Category.js';
import { BookCategory } from './models/BookCategory.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
    try {
        await connectDB();
        
        // Configurar relaciones many-to-many
        Book.belongsToMany(Category, { through: BookCategory, foreignKey: 'bookId' });
        Category.belongsToMany(Book, { through: BookCategory, foreignKey: 'categoryId' });
        
        await sequelize.sync({ force: true }); // Esto borrará y recreará las tablas

        // Crear usuarios de prueba
        const hash1 = bcrypt.hashSync('password123', 10);
        const hash2 = bcrypt.hashSync('admin123', 10);

        await User.create({ username: 'testuser', password: hash1, role: 'user' });
        await User.create({ username: 'admin', password: hash2, role: 'admin' });

        console.log('✅ Usuarios creados:');
        console.log('   - Usuario: testuser, Contraseña: password123, Rol: user');
        console.log('   - Usuario: admin, Contraseña: admin123, Rol: admin');

        // Crear categorías
        const ficcion = await Category.create({ nombre: 'Ficción' });
        const noFiccion = await Category.create({ nombre: 'No Ficción' });
        const clasicos = await Category.create({ nombre: 'Clásicos' });
        const romance = await Category.create({ nombre: 'Romance' });
        const cienciaFiccion = await Category.create({ nombre: 'Ciencia Ficción' });
        const fantasia = await Category.create({ nombre: 'Fantasía' });
        const historia = await Category.create({ nombre: 'Historia' });
        const biografias = await Category.create({ nombre: 'Biografías' });
        const misterio = await Category.create({ nombre: 'Misterio' });
        const aventura = await Category.create({ nombre: 'Aventura' });

        console.log('✅ Categorías creadas correctamente');

        // Crear libros de prueba y asignar categorías
        const quijote = await Book.create({ 
            nombre: 'El Quijote', 
            autor: 'Miguel de Cervantes',
            precio: 25.99,
            descripcion: 'La obra cumbre de la literatura española',
            cantidad_disponible: 10 
        });
        await quijote.setCategories([clasicos, ficcion, aventura]);

        const cienAnios = await Book.create({ 
            nombre: 'Cien años de soledad', 
            autor: 'Gabriel García Márquez',
            precio: 32.50,
            descripcion: 'Obra maestra del realismo mágico',
            cantidad_disponible: 5 
        });
        await cienAnios.setCategories([ficcion, clasicos]);

        const harryPotter = await Book.create({ 
            nombre: 'Harry Potter y la Piedra Filosofal', 
            autor: 'J.K. Rowling',
            precio: 28.75,
            descripcion: 'El inicio de la saga mágica más famosa',
            cantidad_disponible: 8 
        });
        await harryPotter.setCategories([fantasia, ficcion, aventura]);

        const libro1984 = await Book.create({ 
            nombre: '1984', 
            autor: 'George Orwell',
            precio: 19.99,
            descripcion: 'Distopía clásica sobre el totalitarismo',
            cantidad_disponible: 12 
        });
        await libro1984.setCategories([ficcion, cienciaFiccion, clasicos]);

        console.log('Libros creados y categorías asignadas correctamente');
        console.log('\nBase de datos inicializada correctamente');
        
        process.exit(0);
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        process.exit(1);
    }
};

seedDatabase();
