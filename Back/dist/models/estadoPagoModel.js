"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoPago = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
exports.EstadoPago = dbConnection_1.default.define('estadoPago', {
    "ID_ESTADO_PAGO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_ESTADO_PAGO": { type: sequelize_1.DataTypes.STRING },
}, {
    freezeTableName: true,
    timestamps: false
});
