"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const usuarioModel_1 = require("./usuarioModel");
const categoriaModel_1 = require("./categoriaModel");
exports.Producto = dbConnection_1.default.define('producto', {
    "ID_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_PRODUCTO": { type: sequelize_1.DataTypes.STRING },
    "DESCRIPCION_PRODUCTO": { type: sequelize_1.DataTypes.STRING },
    "PRECIO_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER },
    "ESTADO_PRODUCTO": { type: sequelize_1.DataTypes.BOOLEAN },
    "ID_CATEGORIA_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER, references: { model: categoriaModel_1.Categoria, key: 'ID_CATEGORIA' } },
    "ID_USUARIO_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER, references: { model: usuarioModel_1.Usuario, key: 'ID_USUARIO' } }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.Producto.belongsTo(categoriaModel_1.Categoria, { foreignKey: 'ID_CATEGORIA_PRODUCTO', targetKey: 'ID_CATEGORIA', onDelete: 'SET NULL' });
categoriaModel_1.Categoria.hasMany(exports.Producto, { foreignKey: 'ID_CATEGORIA_PRODUCTO', sourceKey: 'ID_CATEGORIA' });
exports.Producto.belongsTo(usuarioModel_1.Usuario, { foreignKey: 'ID_USUARIO_PRODUCTO', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
usuarioModel_1.Usuario.hasMany(exports.Producto, { foreignKey: 'ID_USUARIO_PRODUCTO', sourceKey: 'ID_USUARIO' });
