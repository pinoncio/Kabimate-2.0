"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoHabitacion = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
exports.TipoHabitacion = dbConnection_1.default.define('tipoHabitacion', {
    'ID_TIPO_HABITACION': { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    'NOMBRE_TIPO_HABITACION': { type: sequelize_1.DataTypes.STRING },
    'DESCRIPCION_TIPO_HABITACION': { type: sequelize_1.DataTypes.STRING }
}, {
    timestamps: false,
    freezeTableName: true
});
