"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
exports.Rol = dbConnection_1.default.define('rol', {
    "ID_ROL": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_ROL": { type: sequelize_1.DataTypes.STRING },
    "ESTADO_ROL": { type: sequelize_1.DataTypes.BOOLEAN }
}, {
    freezeTableName: true,
    timestamps: false
});
