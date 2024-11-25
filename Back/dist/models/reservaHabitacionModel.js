"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaHabitacion = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const usuarioModel_1 = require("./usuarioModel");
const estadoPagoModel_1 = require("./estadoPagoModel");
const metodoPagoModel_1 = require("./metodoPagoModel");
const habitacionModel_1 = require("./habitacionModel");
exports.ReservaHabitacion = dbConnection_1.default.define('reservaHabitacion', {
    "ID_RESERVA_HABITACION": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "FECHA_INICIO": { type: sequelize_1.DataTypes.DATE },
    "FECHA_FINAL": { type: sequelize_1.DataTypes.DATE },
    "NOMBRE1_HUESPED": { type: sequelize_1.DataTypes.STRING },
    "NOMBRE2_HUESPED": { type: sequelize_1.DataTypes.STRING },
    "APELLIDO1_HUESPED": { type: sequelize_1.DataTypes.STRING },
    "APELLIDO2_HUESPED": { type: sequelize_1.DataTypes.STRING },
    "EDAD_HUESPED": { type: sequelize_1.DataTypes.INTEGER },
    "RUT_HUESPED": { type: sequelize_1.DataTypes.STRING },
    "DIRECCION_HUESPED": { type: sequelize_1.DataTypes.STRING },
    "TELEFONO_HUESPED": { type: sequelize_1.DataTypes.STRING },
    "ANTICIPO": { type: sequelize_1.DataTypes.INTEGER },
    "TOTAL": { type: sequelize_1.DataTypes.INTEGER },
    "ID_ESTADO_PAGO_RESERVA_HABITACION": { type: sequelize_1.DataTypes.INTEGER, references: { model: estadoPagoModel_1.EstadoPago, key: 'ID_ESTADO_PAGO' } },
    "ID_METODO_PAGO_RESERVA_HABITACION": { type: sequelize_1.DataTypes.INTEGER, references: { model: metodoPagoModel_1.MetodoPago, key: 'ID_METODO_PAGO' } },
    "ID_HABITACION_RESERVA_HABITACION": { type: sequelize_1.DataTypes.INTEGER, references: { model: habitacionModel_1.Habitacion, key: 'ID_HABITACION' } },
    "ID_USUARIO_RESERVA_HABITACION": { type: sequelize_1.DataTypes.INTEGER, references: { model: usuarioModel_1.Usuario, key: 'ID_USUARIO' } },
}, {
    freezeTableName: true,
    timestamps: false
});
exports.ReservaHabitacion.belongsTo(estadoPagoModel_1.EstadoPago, { foreignKey: 'ID_ESTADO_PAGO_RESERVA_HABITACION', targetKey: 'ID_ESTADO_PAGO', onDelete: 'SET NULL' });
metodoPagoModel_1.MetodoPago.hasMany(exports.ReservaHabitacion, { foreignKey: 'ID_ESTADO_PAGO_RESERVA_HABITACION', sourceKey: 'ID_ESTADO_PAGO' });
exports.ReservaHabitacion.belongsTo(metodoPagoModel_1.MetodoPago, { foreignKey: 'ID_METODO_PAGO_RESERVA_HABITACION', targetKey: 'ID_METODO_PAGO', onDelete: 'SET NULL' });
metodoPagoModel_1.MetodoPago.hasMany(exports.ReservaHabitacion, { foreignKey: 'ID_METODO_PAGO_RESERVA_HABITACION', sourceKey: 'ID_METODO_PAGO' });
exports.ReservaHabitacion.belongsTo(habitacionModel_1.Habitacion, { foreignKey: 'ID_HABITACION_RESERVA_HABITACION', targetKey: 'ID_HABITACION', onDelete: 'SET NULL' });
habitacionModel_1.Habitacion.hasMany(exports.ReservaHabitacion, { foreignKey: 'ID_HABITACION_RESERVA_HABITACION', sourceKey: 'ID_HABITACION' });
exports.ReservaHabitacion.belongsTo(usuarioModel_1.Usuario, { foreignKey: 'ID_USUARIO_RESERVA_HABITACION', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
usuarioModel_1.Usuario.hasMany(exports.ReservaHabitacion, { foreignKey: 'ID_USUARIO_RESERVA_HABITACION', sourceKey: 'ID_USUARIO' });
