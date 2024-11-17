import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";
import { Usuario } from "./usuarioModel";

export const Piso = sequelize.define('piso',{
    'ID_PISO': {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    'NOMBRE_PISO': {type: DataTypes.STRING},
    'ESTADO_PISO': {type: DataTypes.BOOLEAN},
    'ID_USUARIO_PISO': {type: DataTypes.INTEGER, references: {model: Usuario, key: 'ID_USUARIO'}}
},
{
    timestamps: false,
    freezeTableName: true
});

Piso.belongsTo(Usuario, { foreignKey: 'ID_USUARIO_PISO', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
Usuario.hasMany(Piso, {foreignKey: 'ID_USUARIO_PISO',sourceKey: 'ID_USUARIO',});