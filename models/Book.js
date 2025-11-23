import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Book = sequelize.define('book', {
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    autor: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    precio: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
        defaultValue: 0.00
    },
    descripcion: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    imagen_url: { 
        type: DataTypes.STRING, 
        allowNull: true,
        defaultValue: 'https://via.placeholder.com/200x300?text=Sin+Imagen'
    },
    cantidad_disponible: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    }
}, {
    tableName: 'books'
});