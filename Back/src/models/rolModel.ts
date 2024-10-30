import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";

export const Rol = sequelize.define('rol',{
    "ID_ROL": {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    "NOMBRE_ROL": {type: DataTypes.STRING},
    "ESTADO_ROL": {type: DataTypes.BOOLEAN}
},
{
    freezeTableName: true,
    timestamps: false
});
