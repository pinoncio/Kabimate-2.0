import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";
import { Usuario } from "./usuarioModel";
import { Categoria } from "./categoriaModel";

export const Producto = sequelize.define('producto',{
    "ID_CATEGORIA":{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    "NOMBRE_PRODUCTO":{type: DataTypes.STRING},
    "DESCRIPCION_PRODUCTO":{type: DataTypes.STRING},
    "PRECIO_PRODUCTO":{type: DataTypes.INTEGER},
    "ESTADO_PRODUCTO":{type: DataTypes.BOOLEAN},
    "ID_PRODUCTO_CATEGORIA":{type: DataTypes.INTEGER, references: {model: Categoria, key: 'ID_CATEGORIA'}},
    "ID_USUARIO_CATEGORIA":{type: DataTypes.INTEGER, references: {model: Usuario, key: 'ID_USUARIO'}}
},
{
    freezeTableName: true,
    timestamps: false
});

Producto.belongsTo(Categoria, { foreignKey: 'ID_CATEGORIA_PRODUCTO', targetKey: 'ID_CATEGORIA', onDelete: 'SET NULL' });
Categoria.hasMany(Producto, {foreignKey: 'ID_CATEGORIA_PRODUCTO',sourceKey: 'ID_CATEGORIA'});

Producto.belongsTo(Usuario, { foreignKey: 'ID_USUARIO_PRODUCTO', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
Usuario.hasMany(Producto, {foreignKey: 'ID_USUARIO_PRODUCTO',sourceKey: 'ID_USUARIO'});

