"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const usuarioModel_1 = require("./usuarioModel");
exports.Categoria = dbConnection_1.default.define('categoria', {
    "ID_CATEGORIA": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_CATEGORIA": { type: sequelize_1.DataTypes.STRING },
    "ESTADO_CATEGORIA": { type: sequelize_1.DataTypes.BOOLEAN },
    "ID_USUARIO_CATEGORIA": { type: sequelize_1.DataTypes.INTEGER, references: { model: usuarioModel_1.Usuario, key: 'ID_USUARIO' } }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.Categoria.belongsTo(usuarioModel_1.Usuario, { foreignKey: 'ID_USUARIO_CATEGORIA', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
usuarioModel_1.Usuario.hasMany(exports.Categoria, { foreignKey: 'ID_USUARIO_CATEGORIA', sourceKey: 'ID_USUARIO' });
