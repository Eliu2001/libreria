import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const User = sequelize.define('user', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});