import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const User = sequelize.define('user', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'user' } // 'user' o 'admin'
}, {
    tableName: 'users'
});