import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";

export const MetodoPago = sequelize.define('metodoPago',{
    "ID_METODO_PAGO":{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    "NOMBRE_METODO_PAGO":{type: DataTypes.STRING},
},
{
    freezeTableName: true,
    timestamps: false
});