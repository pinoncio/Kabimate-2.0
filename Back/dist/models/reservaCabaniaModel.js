"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaCabania = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const usuarioModel_1 = require("./usuarioModel");
const estadoPagoModel_1 = require("./estadoPagoModel");
const metodoPagoModel_1 = require("./metodoPagoModel");
const caba_aModel_1 = require("./caba\u00F1aModel");
exports.ReservaCabania = dbConnection_1.default.define('reservaCabania', {
    "ID_RESERVA_CABANIA": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
    "ID_ESTADO_PAGO_RESERVA_CABANIA": { type: sequelize_1.DataTypes.INTEGER, references: { model: estadoPagoModel_1.EstadoPago, key: 'ID_ESTADO_PAGO' } },
    "ID_METODO_PAGO_RESERVA_CABANIA": { type: sequelize_1.DataTypes.INTEGER, references: { model: metodoPagoModel_1.MetodoPago, key: 'ID_METODO_PAGO' } },
    "ID_CABANIA_RESERVA_CABANIA": { type: sequelize_1.DataTypes.INTEGER, references: { model: caba_aModel_1.Cabania, key: 'ID_CABANIA' } },
    "ID_USUARIO_RESERVA_CABANIA": { type: sequelize_1.DataTypes.INTEGER, references: { model: usuarioModel_1.Usuario, key: 'ID_USUARIO' } },
}, {
    freezeTableName: true,
    timestamps: false
});
exports.ReservaCabania.belongsTo(estadoPagoModel_1.EstadoPago, { foreignKey: 'ID_ESTADO_PAGO_RESERVA_CABANIA', targetKey: 'ID_ESTADO_PAGO', onDelete: 'SET NULL' });
estadoPagoModel_1.EstadoPago.hasMany(exports.ReservaCabania, { foreignKey: 'ID_ESTADO_PAGO_RESERVA_CABANIA', sourceKey: 'ID_ESTADO_PAGO' });
exports.ReservaCabania.belongsTo(metodoPagoModel_1.MetodoPago, { foreignKey: 'ID_METODO_PAGO_RESERVA_CABANIA', targetKey: 'ID_METODO_PAGO', onDelete: 'SET NULL' });
metodoPagoModel_1.MetodoPago.hasMany(exports.ReservaCabania, { foreignKey: 'ID_METODO_PAGO_RESERVA_CABANIA', sourceKey: 'ID_METODO_PAGO' });
exports.ReservaCabania.belongsTo(caba_aModel_1.Cabania, { foreignKey: 'ID_CABANIA_RESERVA_CABANIA', targetKey: 'ID_CABANIA', onDelete: 'SET NULL' });
caba_aModel_1.Cabania.hasMany(exports.ReservaCabania, { foreignKey: 'ID_CABANIA_RESERVA_CABANIA', sourceKey: 'ID_CABANIA' });
exports.ReservaCabania.belongsTo(usuarioModel_1.Usuario, { foreignKey: 'ID_USUARIO_RESERVA_CABANIA', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
usuarioModel_1.Usuario.hasMany(exports.ReservaCabania, { foreignKey: 'ID_USUARIO_RESERVA_CABANIA', sourceKey: 'ID_USUARIO' });
