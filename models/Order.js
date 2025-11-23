import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";

export const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'completado', 'cancelado'),
        defaultValue: 'completado'
    }
}, {
    tableName: 'orders'
});

// Relaciones
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });
