import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";

export const Estado = sequelize.define('estado',{
    "ID_ESTADO": {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    "NOMBRE_ESTADO": {type: DataTypes.STRING},
    "DESCRIPCION_ESTADO": {type: DataTypes.STRING},

},
{
    freezeTableName: true,
    timestamps: false
});
