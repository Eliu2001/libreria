import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const BookCategory = sequelize.define('bookCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'bookCategories'
});
