import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";
import { Book } from "./Book.js";

export const Cart = sequelize.define('cart', {
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
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    }
});

// Definir relaciones
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Book, { foreignKey: 'bookId' });
User.hasMany(Cart, { foreignKey: 'userId' });
Book.hasMany(Cart, { foreignKey: 'bookId' });
