import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";
import { TipoHabitacion } from "./tipoHabitacionModel";
import { Piso } from "./pisoModel";
import { Estado } from "./estadoModel";
import { Usuario } from "./usuarioModel";


export const Habitacion = sequelize.define('habitacion',{
    'ID_HABITACION': {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    'NUMERO_HABITACION': {type: DataTypes.INTEGER},
    'CAPACIDAD': {type: DataTypes.INTEGER},
    'PRECIO_POR_NOCHE': {type: DataTypes.INTEGER},
    'SERVICIOS_INCLUIDOS': {type: DataTypes.STRING},
    'DESCRIPCION_HABITACION': {type: DataTypes.STRING},
    'ESTADO_HABITACION': {type: DataTypes.BOOLEAN},
    'ID_TIPO_HABITACION_HABITACION': {type: DataTypes.INTEGER, references: {model: TipoHabitacion, key: 'ID_TIPO_HABITACION'}},
    'ID_PISO_HABITACION': {type: DataTypes.INTEGER, references: {model: Piso, key: 'ID_PISO'}},
    'ID_ESTADO_HABITACION': {type: DataTypes.INTEGER, references: {model: Estado, key: 'ID_ESTADO'}},
    'ID_USUARIO_HABITACION': {type: DataTypes.INTEGER, references: {model: Usuario, key: 'ID_USUARIO'}}
},
{
    timestamps: false,
    freezeTableName: true
});

Habitacion.belongsTo(TipoHabitacion, { foreignKey: 'ID_TIPO_HABITACION_HABITACION', targetKey: 'ID_TIPO_HABITACION', onDelete: 'SET NULL' });
TipoHabitacion.hasMany(Habitacion, {foreignKey: 'ID_TIPO_HABITACION_HABITACION',sourceKey: 'ID_TIPO_HABITACION',}); 

Habitacion.belongsTo(Piso, { foreignKey: 'ID_PISO_HABITACION', targetKey: 'ID_PISO', onDelete: 'CASCADE' }); 
Piso.hasMany(Habitacion, {foreignKey: 'ID_PISO_HABITACION',sourceKey: 'ID_PISO',}); 

Habitacion.belongsTo(Estado, { foreignKey: 'ID_ESTADO_HABITACION', targetKey: 'ID_ESTADO', onDelete: 'SET NULL' }); 
Estado.hasMany(Habitacion, {foreignKey: 'ID_ESTADO_HABITACION',sourceKey: 'ID_ESTADO',}); 

Habitacion.belongsTo(Usuario, { foreignKey: 'ID_USUARIO_HABITACION', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' }); 
Usuario.hasMany(Habitacion, {foreignKey: 'ID_USUARIO_HABITACION',sourceKey: 'ID_USUARIO',}); 