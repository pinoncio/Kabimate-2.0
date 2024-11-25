import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnection";
import { Usuario } from "./usuarioModel";
import { EstadoPago } from "./estadoPagoModel";
import { MetodoPago } from "./metodoPagoModel";
import { Habitacion } from "./habitacionModel";

export const ReservaHabitacion = sequelize.define('reservaHabitacion',{
    "ID_RESERVA_HABITACION":{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
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
    "ID_ESTADO_PAGO_RESERVA_HABITACION":{type: DataTypes.INTEGER, references: {model: EstadoPago , key: 'ID_ESTADO_PAGO'}},
    "ID_METODO_PAGO_RESERVA_HABITACION": {type: DataTypes.INTEGER, references: {model: MetodoPago, key: 'ID_METODO_PAGO'}},
    "ID_HABITACION_RESERVA_HABITACION": {type: DataTypes.INTEGER, references: {model: Habitacion, key: 'ID_HABITACION'}},
    "ID_USUARIO_RESERVA_HABITACION": {type: DataTypes.INTEGER, references: {model: Usuario, key: 'ID_USUARIO'}},
},
{
    freezeTableName: true,
    timestamps: false
});

ReservaHabitacion.belongsTo(EstadoPago, { foreignKey: 'ID_ESTADO_PAGO_RESERVA_HABITACION', targetKey: 'ID_ESTADO_PAGO', onDelete: 'SET NULL' });
MetodoPago.hasMany(ReservaHabitacion, {foreignKey: 'ID_ESTADO_PAGO_RESERVA_HABITACION',sourceKey: 'ID_ESTADO_PAGO'});

ReservaHabitacion.belongsTo(MetodoPago, { foreignKey: 'ID_METODO_PAGO_RESERVA_HABITACION', targetKey: 'ID_METODO_PAGO', onDelete: 'SET NULL' });
MetodoPago.hasMany(ReservaHabitacion, {foreignKey: 'ID_METODO_PAGO_RESERVA_HABITACION',sourceKey: 'ID_METODO_PAGO'});

ReservaHabitacion.belongsTo(Habitacion, { foreignKey: 'ID_HABITACION_RESERVA_HABITACION', targetKey: 'ID_HABITACION', onDelete: 'SET NULL' });
Habitacion.hasMany(ReservaHabitacion, {foreignKey: 'ID_HABITACION_RESERVA_HABITACION',sourceKey: 'ID_HABITACION'});

ReservaHabitacion.belongsTo(Usuario, { foreignKey: 'ID_USUARIO_RESERVA_HABITACION', targetKey: 'ID_USUARIO', onDelete: 'CASCADE' });
Usuario.hasMany(ReservaHabitacion, {foreignKey: 'ID_USUARIO_RESERVA_HABITACION',sourceKey: 'ID_USUARIO'});
