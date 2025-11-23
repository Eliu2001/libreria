import { sequelize } from './config/database.js';
import './models/User.js';
import './models/Book.js';
import './models/Cart.js';
import './models/Order.js';
import './models/OrderItem.js';

const syncDatabase = async () => {
    try {
        // Sincronizar base de datos (CUIDADO: force: true elimina todas las tablas)
        await sequelize.sync({ force: true });
        console.log('✅ Base de datos sincronizada correctamente');
        console.log('✅ Todas las tablas han sido recreadas');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al sincronizar base de datos:', error);
        process.exit(1);
    }
};

syncDatabase();
