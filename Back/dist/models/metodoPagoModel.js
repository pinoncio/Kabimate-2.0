"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodoPago = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
exports.MetodoPago = dbConnection_1.default.define('metodoPago', {
    "ID_METODO_PAGO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_METODO_PAGO": { type: sequelize_1.DataTypes.STRING },
}, {
    freezeTableName: true,
    timestamps: false
});
