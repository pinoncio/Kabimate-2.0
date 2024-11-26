"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleReservaCabaniaProducto = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const reservaCabaniaModel_1 = require("./reservaCabaniaModel");
const productoModel_1 = require("./productoModel");
exports.DetalleReservaCabaniaProducto = dbConnection_1.default.define('detalleReservaCabaniaProducto', {
    "ID_DETALLE_RESERVA_CABANIA_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "CANTIDAD": { type: sequelize_1.DataTypes.INTEGER },
    "TOTAL": { type: sequelize_1.DataTypes.INTEGER },
    "ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER, references: { model: productoModel_1.Producto, key: 'ID_PRODUCTO' } },
    "ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER, references: { model: reservaCabaniaModel_1.ReservaCabania, key: 'ID_RESERVA_CABANIA' } }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.DetalleReservaCabaniaProducto.belongsTo(productoModel_1.Producto, { foreignKey: 'ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO', targetKey: 'ID_PRODUCTO', onDelete: 'SET NULL' });
productoModel_1.Producto.hasMany(exports.DetalleReservaCabaniaProducto, { foreignKey: 'ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO', sourceKey: 'ID_PRODUCTO' });
exports.DetalleReservaCabaniaProducto.belongsTo(reservaCabaniaModel_1.ReservaCabania, { foreignKey: 'ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO', targetKey: 'ID_RESERVA_CABANIA', onDelete: 'CASCADE' });
reservaCabaniaModel_1.ReservaCabania.hasMany(exports.DetalleReservaCabaniaProducto, { foreignKey: 'ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO', sourceKey: 'ID_RESERVA_CABANIA' });
