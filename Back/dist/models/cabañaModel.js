"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cabania = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const estadoModel_1 = require("./estadoModel");
exports.Cabania = dbConnection_1.default.define('cabania', {
    "ID_CABANIA": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "CAPACIDAD": { type: sequelize_1.DataTypes.INTEGER },
    "CANTIDAD_PIEZAS": { type: sequelize_1.DataTypes.INTEGER },
    "PRECIO_POR_NOCHE": { type: sequelize_1.DataTypes.INTEGER },
    "UBICACION": { type: sequelize_1.DataTypes.STRING },
    "SERVICIOS_INCLUIDOS": { type: sequelize_1.DataTypes.STRING },
    "DESCRIPCION_CABANIA": { type: sequelize_1.DataTypes.STRING },
    "ESTADO_CABANIA": { type: sequelize_1.DataTypes.BOOLEAN },
    "ID_ESTADO_CABANIA": { type: sequelize_1.DataTypes.INTEGER, references: { model: estadoModel_1.Estado, key: 'ID_ESTADO' } }
}, {
    freezeTableName: true,
    timestamps: false
});
//asociaciones de la tabla cabania
exports.Cabania.belongsTo(estadoModel_1.Estado, { foreignKey: 'ID_ESTADO_CABANIA', targetKey: 'ID_ESTADO', onDelete: 'SET NULL' });
estadoModel_1.Estado.hasMany(exports.Cabania, { foreignKey: 'ID_ESTADO_CABANIA', sourceKey: 'ID_ESTADO', });
