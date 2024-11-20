import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";
import { Usuario } from "./usuarioModel";

export const Categoria = sequelize.define('categoria',{
    "ID_CATEGORIA":{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    "NOMBRE_CATEGORIA":{type: DataTypes.STRING},
    "ESTADO_CATEGORIA":{type: DataTypes.BOOLEAN},
    "ID_USUARIO_CATEGORIA":{type: DataTypes.INTEGER, references: {model: Usuario, key: 'ID_USUARIO'}}
},
{
    freezeTableName: true,
    timestamps: false
});

Categoria.belongsTo(Usuario, { foreignKey: 'ID_USUARIO_CATEGORIA', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
Usuario.hasMany(Categoria, {foreignKey: 'ID_USUARIO_CATEGORIA',sourceKey: 'ID_USUARIO'});