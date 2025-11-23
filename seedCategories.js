import { sequelize } from './config/database.js';
import { Category } from './models/Category.js';

const seedCategories = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        const categories = [
            { nombre: 'Ficción' },
            { nombre: 'No Ficción' },
            { nombre: 'Clásicos' },
            { nombre: 'Romance' },
            { nombre: 'Ciencia Ficción' },
            { nombre: 'Fantasía' },
            { nombre: 'Historia' },
            { nombre: 'Biografías' },
            { nombre: 'Misterio' },
            { nombre: 'Aventura' }
        ];

        for (const cat of categories) {
            await Category.findOrCreate({
                where: { nombre: cat.nombre },
                defaults: cat
            });
        }

        console.log('✅ Categorías creadas correctamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al crear categorías:', error);
        process.exit(1);
    }
};

seedCategories();
