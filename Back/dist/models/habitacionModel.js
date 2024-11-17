"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habitacion = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const tipoHabitacionModel_1 = require("./tipoHabitacionModel");
const pisoModel_1 = require("./pisoModel");
const estadoModel_1 = require("./estadoModel");
const usuarioModel_1 = require("./usuarioModel");
exports.Habitacion = dbConnection_1.default.define('habitacion', {
    'ID_HABITACION': { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    'NUMERO_HABITACION': { type: sequelize_1.DataTypes.INTEGER },
    'CAPACIDAD': { type: sequelize_1.DataTypes.INTEGER },
    'PRECIO_POR_NOCHE': { type: sequelize_1.DataTypes.INTEGER },
    'SERVICIOS_INCLUIDOS': { type: sequelize_1.DataTypes.STRING },
    'DESCRIPCION_HABITACION': { type: sequelize_1.DataTypes.STRING },
    'ESTADO_HABITACION': { type: sequelize_1.DataTypes.BOOLEAN },
    'ID_TIPO_HABITACION_HABITACION': { type: sequelize_1.DataTypes.INTEGER, references: { model: tipoHabitacionModel_1.TipoHabitacion, key: 'ID_TIPO_HABITACION' } },
    'ID_PISO_HABITACION': { type: sequelize_1.DataTypes.INTEGER, references: { model: pisoModel_1.Piso, key: 'ID_PISO' } },
    'ID_ESTADO_HABITACION': { type: sequelize_1.DataTypes.INTEGER, references: { model: estadoModel_1.Estado, key: 'ID_ESTADO' } },
    'ID_USUARIO_HABITACION': { type: sequelize_1.DataTypes.INTEGER, references: { model: usuarioModel_1.Usuario, key: 'ID_USUARIO' } }
});
exports.Habitacion.belongsTo(tipoHabitacionModel_1.TipoHabitacion, { foreignKey: 'ID_TIPO_HABITACION_HABITACION', targetKey: 'ID_TIPO_HABITACION', onDelete: 'SET NULL' });
tipoHabitacionModel_1.TipoHabitacion.hasMany(exports.Habitacion, { foreignKey: 'ID_TIPO_HABITACION_HABITACION', sourceKey: 'ID_TIPO_HABITACION', });
exports.Habitacion.belongsTo(pisoModel_1.Piso, { foreignKey: 'ID_PISO_HABITACION', targetKey: 'ID_PISO', onDelete: 'CASCADE' });
pisoModel_1.Piso.hasMany(exports.Habitacion, { foreignKey: 'ID_PISO_HABITACION', sourceKey: 'ID_PISO', });
exports.Habitacion.belongsTo(estadoModel_1.Estado, { foreignKey: 'ID_ESTADO_HABITACION', targetKey: 'ID_ESTADO', onDelete: 'SET NULL' });
estadoModel_1.Estado.hasMany(exports.Habitacion, { foreignKey: 'ID_ESTADO_HABITACION', sourceKey: 'ID_ESTADO', });
exports.Habitacion.belongsTo(usuarioModel_1.Usuario, { foreignKey: 'ID_USUARIO_HABITACION', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
usuarioModel_1.Usuario.hasMany(exports.Habitacion, { foreignKey: 'ID_USUARIO_HABITACION', sourceKey: 'ID_USUARIO', });
