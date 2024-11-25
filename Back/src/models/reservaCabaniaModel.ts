import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";
import { Usuario } from "./usuarioModel";
import { EstadoPago } from "./estadoPagoModel";
import { MetodoPago } from "./metodoPagoModel";
import { Cabania } from "./cabañaModel";

export const ReservaCabania = sequelize.define('reservaCabania',{
    "ID_RESERVA_CABANIA":{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    "FECHA_INICIO": {type: DataTypes.DATE},
    "FECHA_FINAL": {type: DataTypes.DATE},
    "NOMBRE1_HUESPED": {type: DataTypes.STRING},
    "NOMBRE2_HUESPED": {type: DataTypes.STRING},
    "APELLIDO1_HUESPED": {type: DataTypes.STRING},
    "APELLIDO2_HUESPED": {type: DataTypes.STRING},
    "EDAD_HUESPED": {type: DataTypes.INTEGER},
    "RUT_HUESPED": {type: DataTypes.STRING},
    "DIRECCION_HUESPED": {type: DataTypes.STRING},
    "TELEFONO_HUESPED": {type: DataTypes.STRING},
    "ANTICIPO": {type: DataTypes.INTEGER},
    "TOTAL": {type: DataTypes.INTEGER},
    "ID_ESTADO_PAGO_RESERVA_CABANIA":{type: DataTypes.INTEGER, references: {model: EstadoPago , key: 'ID_ESTADO_PAGO'}},
    "ID_METODO_PAGO_RESERVA_CABANIA": {type: DataTypes.INTEGER, references: {model: MetodoPago, key: 'ID_METODO_PAGO'}},
    "ID_CABANIA_RESERVA_CABANIA": {type: DataTypes.INTEGER, references: {model: Cabania, key: 'ID_CABANIA'}},
    "ID_USUARIO_RESERVA_CABANIA": {type: DataTypes.INTEGER, references: {model: Usuario, key: 'ID_USUARIO'}},
},
{
    freezeTableName: true,
    timestamps: false
});

ReservaCabania.belongsTo(EstadoPago, { foreignKey: 'ID_ESTADO_PAGO_RESERVA_CABANIA', targetKey: 'ID_ESTADO_PAGO', onDelete: 'SET NULL' });
EstadoPago.hasMany(ReservaCabania, {foreignKey: 'ID_ESTADO_PAGO_RESERVA_CABANIA',sourceKey: 'ID_ESTADO_PAGO'});

ReservaCabania.belongsTo(MetodoPago, { foreignKey: 'ID_METODO_PAGO_RESERVA_CABANIA', targetKey: 'ID_METODO_PAGO', onDelete: 'SET NULL' });
MetodoPago.hasMany(ReservaCabania, {foreignKey: 'ID_METODO_PAGO_RESERVA_CABANIA',sourceKey: 'ID_METODO_PAGO'});

ReservaCabania.belongsTo(Cabania, { foreignKey: 'ID_CABANIA_RESERVA_CABANIA', targetKey: 'ID_CABANIA', onDelete: 'SET NULL' });
Cabania.hasMany(ReservaCabania, {foreignKey: 'ID_CABANIA_RESERVA_CABANIA',sourceKey: 'ID_CABANIA'});

ReservaCabania.belongsTo(Usuario, { foreignKey: 'ID_USUARIO_RESERVA_CABANIA', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
Usuario.hasMany(ReservaCabania, {foreignKey: 'ID_USUARIO_RESERVA_CABANIA',sourceKey: 'ID_USUARIO'});
