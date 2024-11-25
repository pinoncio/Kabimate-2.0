import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";

export const EstadoPago = sequelize.define('estadoPago',{
    "ID_ESTADO_PAGO":{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    "NOMBRE_ESTADO_PAGO":{type: DataTypes.STRING},
},
{
    freezeTableName: true,
    timestamps: false
});