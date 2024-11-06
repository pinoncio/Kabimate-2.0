import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";
import { Estado } from "./estadoModel";
import { Usuario } from "./usuarioModel";

export const Cabania = sequelize.define('cabania',{
    "ID_CABANIA": {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    "CAPACIDAD": {type: DataTypes.INTEGER},
    "CANTIDAD_PIEZAS": {type: DataTypes.INTEGER},
    "PRECIO_POR_NOCHE":{type: DataTypes.INTEGER},
    "UBICACION":{type: DataTypes.STRING},
    "SERVICIOS_INCLUIDOS": { type: DataTypes.STRING},
    "DESCRIPCION_CABANIA": {type: DataTypes.STRING},
    "ESTADO_CABANIA": {type: DataTypes.BOOLEAN},
    "ID_ESTADO_CABANIA": {type: DataTypes.INTEGER, references: {model: Estado, key: 'ID_ESTADO'}},
    "ID_USUARIO_CABANIA": {type: DataTypes.INTEGER, references: {model: Usuario, key: 'ID_USUARIO'}}
},
{
    freezeTableName: true,
    timestamps: false
});

//asociaciones de la tabla cabania
Cabania.belongsTo(Estado, { foreignKey: 'ID_ESTADO_CABANIA', targetKey: 'ID_ESTADO', onDelete: 'SET NULL' });
Estado.hasMany(Cabania, {foreignKey: 'ID_ESTADO_CABANIA',sourceKey: 'ID_ESTADO'});
Cabania.belongsTo(Usuario, { foreignKey: 'ID_USUARIO_CABANIA', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
Usuario.hasMany(Cabania, {foreignKey: 'ID_USUARIO_CABANIA',sourceKey: 'ID_USUARIO'});