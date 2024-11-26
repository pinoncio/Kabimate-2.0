import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";
import { ReservaCabania } from "./reservaCabaniaModel";
import { Producto } from "./productoModel";

export const DetalleReservaCabaniaProducto = sequelize.define('detalleReservaCabaniaProducto',{
    "ID_DETALLE_RESERVA_CABANIA_PRODUCTO":{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    "CANTIDAD":{type: DataTypes.INTEGER},
    "TOTAL":{type: DataTypes.INTEGER},
    "ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO":{type: DataTypes.INTEGER, references: {model: Producto, key: 'ID_PRODUCTO'}},
    "ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO": {type: DataTypes.INTEGER, references: {model: ReservaCabania, key: 'ID_RESERVA_CABANIA'}}
},
{
    freezeTableName: true,
    timestamps: false
});

DetalleReservaCabaniaProducto.belongsTo(Producto, { foreignKey: 'ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO', targetKey: 'ID_PRODUCTO', onDelete: 'SET NULL' });
Producto.hasMany(DetalleReservaCabaniaProducto, {foreignKey: 'ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO',sourceKey: 'ID_PRODUCTO'});

DetalleReservaCabaniaProducto.belongsTo(ReservaCabania, { foreignKey: 'ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO', targetKey: 'ID_RESERVA_CABANIA', onDelete: 'CASCADE' });
ReservaCabania.hasMany(DetalleReservaCabaniaProducto, {foreignKey: 'ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO',sourceKey: 'ID_RESERVA_CABANIA'});