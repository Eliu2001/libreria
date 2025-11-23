import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Book = sequelize.define('book', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    cantidad_disponible: { type: DataTypes.INTEGER, defaultValue: 0 }
});