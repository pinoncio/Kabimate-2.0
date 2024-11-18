import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";


export const TipoHabitacion = sequelize.define('tipoHabitacion',{
    'ID_TIPO_HABITACION': {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    'NOMBRE_TIPO_HABITACION': {type: DataTypes.STRING},
    'DESCRIPCION_TIPO_HABITACION': {type: DataTypes.STRING}
},
{
    timestamps: false,
    freezeTableName: true
});
