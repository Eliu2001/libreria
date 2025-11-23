import bcrypt from 'bcryptjs';
import { connectDB, sequelize } from './config/database.js';
import { User } from './models/User.js';
import { Book } from './models/Book.js';
import { Cart } from './models/Cart.js';
import { Order } from './models/Order.js';
import { OrderItem } from './models/OrderItem.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
    try {
        await connectDB();
        await sequelize.sync({ force: true }); // Esto borrará y recreará las tablas

        // Crear usuarios de prueba
        const hash1 = bcrypt.hashSync('password123', 10);
        const hash2 = bcrypt.hashSync('admin123', 10);

        await User.create({ username: 'testuser', password: hash1, role: 'user' });
        await User.create({ username: 'admin', password: hash2, role: 'admin' });

        console.log('✅ Usuarios creados:');
        console.log('   - Usuario: testuser, Contraseña: password123, Rol: user');
        console.log('   - Usuario: admin, Contraseña: admin123, Rol: admin');

        // Crear libros de prueba
        await Book.create({ 
            nombre: 'El Quijote', 
            autor: 'Miguel de Cervantes',
            precio: 25.99,
            descripcion: 'La obra cumbre de la literatura española',
            cantidad_disponible: 10 
        });
        await Book.create({ 
            nombre: 'Cien años de soledad', 
            autor: 'Gabriel García Márquez',
            precio: 32.50,
            descripcion: 'Obra maestra del realismo mágico',
            cantidad_disponible: 5 
        });
        await Book.create({ 
            nombre: 'Harry Potter y la Piedra Filosofal', 
            autor: 'J.K. Rowling',
            precio: 28.75,
            descripcion: 'El inicio de la saga mágica más famosa',
            cantidad_disponible: 8 
        });
        await Book.create({ 
            nombre: '1984', 
            autor: 'George Orwell',
            precio: 19.99,
            descripcion: 'Distopía clásica sobre el totalitarismo',
            cantidad_disponible: 12 
        });

        console.log('✅ Libros creados correctamente');
        console.log('\n🚀 Base de datos inicializada correctamente');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al inicializar la base de datos:', error);
        process.exit(1);
    }
};

seedDatabase();
