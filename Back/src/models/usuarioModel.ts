import { DataTypes } from "sequelize";
import sequelize from '../db/dbConnection';
import { Rol } from "./rolModel";
import { Institucion } from "./institucionModel";

export const Usuario = sequelize.define('usuario', {
    'ID_USUARIO': {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    'NOMBRE1_USUARIO': {type: DataTypes.STRING},
    'NOMBRE2_USUARIO': {type: DataTypes.STRING},
    'APELLIDO1_USUARIO': {type: DataTypes.STRING},
    'APELLIDO2_USUARIO': {type: DataTypes.STRING},
    'RUT_USUARIO': {type: DataTypes.STRING},
    'CONTRASENIA_USUARIO': {type: DataTypes.STRING},
    'EMAIL_USUARIO': {type: DataTypes.STRING},
    'ESTADO_CUENTA': {type: DataTypes.BOOLEAN},
    'ID_INSTITUCION_USUARIO': {type: DataTypes.INTEGER, references: {model: Institucion, key: 'ID_INSTITUCION'}},
    'ID_ROL_USUARIO': {type: DataTypes.INTEGER, references: {model: Rol, key: 'ID_ROL'}},
},
{
    freezeTableName: true,
    timestamps: false

})
 //asociaciones de la tabla usuario
Usuario.belongsTo(Rol, { foreignKey: 'ID_ROL_USUARIO', targetKey: 'ID_ROL', onDelete: 'SET NULL' });
Usuario.belongsTo(Institucion, { foreignKey: 'ID_INSTITUCION_USUARIO', targetKey: 'ID_INSTITUCION', onDelete: 'SET NULL' });
Rol.hasMany(Usuario, {foreignKey: 'ID_ROL_USUARIO',sourceKey: 'ID_ROL',});
Institucion.hasMany(Usuario, {foreignKey: 'ID_INSTITUCION_USUARIO',sourceKey: 'ID_INSTITUCION',})
