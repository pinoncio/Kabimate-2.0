import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";
import { ReservaHabitacion } from "./reservaHabitacionModel";
import { Producto } from "./productoModel";

export const DetalleReservaHabitacionProducto = sequelize.define('detalleReservaHabitacionProducto',{
    "ID_DETALLE_RESERVA_HABITACION_PRODUCTO":{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    "CANTIDAD":{type: DataTypes.INTEGER},
    "TOTAL":{type: DataTypes.INTEGER},
    "ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO":{type: DataTypes.INTEGER, references: {model: Producto, key: 'ID_PRODUCTO'}},
    "ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO": {type: DataTypes.INTEGER, references: {model: ReservaHabitacion, key: 'ID_RESERVA_HABITACION'}}
},
{
    freezeTableName: true,
    timestamps: false
});

DetalleReservaHabitacionProducto.belongsTo(Producto, { foreignKey: 'ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO', targetKey: 'ID_PRODUCTO', onDelete: 'SET NULL' });
Producto.hasMany(DetalleReservaHabitacionProducto, {foreignKey: 'ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO',sourceKey: 'ID_PRODUCTO'});

DetalleReservaHabitacionProducto.belongsTo(ReservaHabitacion, { foreignKey: 'ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO', targetKey: 'ID_RESERVA_HABITACION', onDelete: 'CASCADE' });
ReservaHabitacion.hasMany(DetalleReservaHabitacionProducto, {foreignKey: 'ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO',sourceKey: 'ID_RESERVA_HABITACION'});