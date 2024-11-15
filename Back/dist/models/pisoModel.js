"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piso = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const usuarioModel_1 = require("./usuarioModel");
exports.Piso = dbConnection_1.default.define('piso', {
    'ID_PISO': { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    'NOMBRE_PISO': { type: sequelize_1.DataTypes.STRING },
    'ESTADO_PISO': { type: sequelize_1.DataTypes.BOOLEAN },
    'ID_USUARIO_PISO': { type: sequelize_1.DataTypes.INTEGER, references: { model: usuarioModel_1.Usuario, key: 'ID_USUARIO' } }
}, {
    timestamps: false,
    freezeTableName: true
});
exports.Piso.belongsTo(usuarioModel_1.Usuario, { foreignKey: 'ID_USUARIO_PISO', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
usuarioModel_1.Usuario.hasMany(exports.Piso, { foreignKey: 'ID_USUARIO_PISO', sourceKey: 'ID_USUARIO', });
