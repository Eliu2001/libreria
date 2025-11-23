import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Book = sequelize.define('book', {
    title: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 }
});