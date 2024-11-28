"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleReservaHabitacionProducto = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const reservaHabitacionModel_1 = require("./reservaHabitacionModel");
const productoModel_1 = require("./productoModel");
exports.DetalleReservaHabitacionProducto = dbConnection_1.default.define('detalleReservaHabitacionProducto', {
    "ID_DETALLE_RESERVA_HABITACION_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "CANTIDAD": { type: sequelize_1.DataTypes.INTEGER },
    "TOTAL": { type: sequelize_1.DataTypes.INTEGER },
    "ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER, references: { model: productoModel_1.Producto, key: 'ID_PRODUCTO' } },
    "ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER, references: { model: reservaHabitacionModel_1.ReservaHabitacion, key: 'ID_RESERVA_HABITACION' } }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.DetalleReservaHabitacionProducto.belongsTo(productoModel_1.Producto, { foreignKey: 'ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO', targetKey: 'ID_PRODUCTO', onDelete: 'SET NULL' });
productoModel_1.Producto.hasMany(exports.DetalleReservaHabitacionProducto, { foreignKey: 'ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO', sourceKey: 'ID_PRODUCTO' });
exports.DetalleReservaHabitacionProducto.belongsTo(reservaHabitacionModel_1.ReservaHabitacion, { foreignKey: 'ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO', targetKey: 'ID_RESERVA_HABITACION', onDelete: 'CASCADE' });
reservaHabitacionModel_1.ReservaHabitacion.hasMany(exports.DetalleReservaHabitacionProducto, { foreignKey: 'ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO', sourceKey: 'ID_RESERVA_HABITACION' });
