"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalizarReservaHabitacion = exports.verificarEstadosHabitacion = exports.updateProductoReservaHabitacion = exports.agregarProductoReservaHabitacion = exports.updateReservaHabitacion = exports.deleteReservaHabitacion = exports.getReservasHabitacion = exports.getReservaHabitacion = exports.newReservaHabitacion = void 0;
const usuarioModel_1 = require("../models/usuarioModel");
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const habitacionModel_1 = require("../models/habitacionModel");
const reservaHabitacionModel_1 = require("../models/reservaHabitacionModel");
const productoModel_1 = require("../models/productoModel");
const detalleReservaHabitacionProductoModel_1 = require("../models/detalleReservaHabitacionProductoModel");
const newReservaHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { fecha_inicio, fecha_final, nombre1_huesped, nombre2_huesped, apellido1_huesped, apellido2_huesped, edad_huesped, rut_huesped, direccion_huesped, telefono_huesped, anticipo, id_habitacion } = req.body;
    const usuario = yield usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(400).json({
            msg: "El usuario ingresado no existe"
        });
    }
    ;
    if (!fecha_inicio || !fecha_final || !nombre1_huesped || !nombre2_huesped || !apellido1_huesped || !apellido2_huesped || !edad_huesped || !rut_huesped || !direccion_huesped || !telefono_huesped || !id_habitacion) {
        return res.json({
            msg: "Todos los campos deben ser llenados"
        });
    }
    ;
    const habitacion = yield habitacionModel_1.Habitacion.findOne({ where: { ID_HABITACION: id_habitacion } });
    if ((habitacion === null || habitacion === void 0 ? void 0 : habitacion.dataValues.ID_ESTADO_HABITACION) == 2) {
        return res.json({
            msg: "No puede reservar la habitacion porque actualmente se encuentra ocupada"
        });
    }
    ;
    if ((habitacion === null || habitacion === void 0 ? void 0 : habitacion.dataValues.ID_ESTADO_HABITACION) == 3) {
        return res.json({
            msg: "No puede reservar la habitacion porque actualmente se encuentra en mantencion"
        });
    }
    ;
    const estaraOcupada = yield reservaHabitacionModel_1.ReservaHabitacion.findAll({
        where: {
            ID_ESTADO_PAGO_RESERVA_HABITACION: 1,
            ID_HABITACION_RESERVA_HABITACION: id_habitacion,
            [sequelize_1.Op.or]: [
                {
                    FECHA_INICIO: {
                        [sequelize_1.Op.between]: [fecha_inicio, fecha_final]
                    }
                },
                {
                    FECHA_FINAL: {
                        [sequelize_1.Op.between]: [fecha_inicio, fecha_final]
                    }
                },
                {
                    [sequelize_1.Op.and]: [
                        { FECHA_INICIO: { [sequelize_1.Op.lte]: fecha_inicio } },
                        { FECHA_FINAL: { [sequelize_1.Op.gte]: fecha_final } }
                    ]
                }
            ]
        }
    });
    if (estaraOcupada.length > 0) {
        return res.json({
            msg: "La habitacion ya tiene reservas en ese rango de fechas"
        });
    }
    const fecha_inicio_convertida = new Date(fecha_inicio);
    const fecha_final_convertida = new Date(fecha_final);
    // Restar las marcas de tiempo en milisegundos
    const diferenciaEnMilisegundos = fecha_final_convertida.getTime() - fecha_inicio_convertida.getTime();
    // Convertir la diferencia de milisegundos a días
    const cantidad_dias_reserva = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    const nuevoTotal = ((habitacion === null || habitacion === void 0 ? void 0 : habitacion.dataValues.PRECIO_POR_NOCHE) * cantidad_dias_reserva) - anticipo;
    try {
        yield reservaHabitacionModel_1.ReservaHabitacion.create({
            "FECHA_INICIO": fecha_inicio,
            "FECHA_FINAL": fecha_final,
            "NOMBRE1_HUESPED": nombre1_huesped,
            "NOMBRE2_HUESPED": nombre2_huesped,
            "APELLIDO1_HUESPED": apellido1_huesped,
            "APELLIDO2_HUESPED": apellido2_huesped,
            "EDAD_HUESPED": edad_huesped,
            "RUT_HUESPED": rut_huesped,
            "DIRECCION_HUESPED": direccion_huesped,
            "TELEFONO_HUESPED": telefono_huesped,
            "ANTICIPO": anticipo,
            "TOTAL": nuevoTotal,
            "ID_HABITACION_RESERVA_HABITACION": id_habitacion,
            "ID_USUARIO_RESERVA_HABITACION": id_usuario,
            "ID_ESTADO_PAGO_RESERVA_HABITACION": 1
        });
        const hoy = new Date();
        if (new Date(fecha_inicio).toDateString() === hoy.toDateString()) {
            yield habitacionModel_1.Habitacion.update({
                ID_ESTADO_HABITACION: 2
            }, { where: { ID_HABITACION: id_habitacion } });
        }
        return res.status(201).json({
            msg: 'La reserva de la habitacion ' + id_habitacion + " ha sido exitosa"
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error al crear la reserva de la habitacion con id: " + id_habitacion,
            error
        });
    }
    ;
});
exports.newReservaHabitacion = newReservaHabitacion;
const getReservaHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_reserva } = req.params;
    try {
        const reserva = yield reservaHabitacionModel_1.ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
        if (!reserva) {
            return res.status(404).json({
                msg: "No existe un reserva con el id: " + id_reserva
            });
        }
        ;
        res.json(reserva);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error al obtener la reserva de habitacion con id: " + id_reserva,
            error
        });
    }
    ;
});
exports.getReservaHabitacion = getReservaHabitacion;
const getReservasHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const usuario = yield usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(404).json({
            msg: "El usuario ingresado no existe"
        });
    }
    ;
    try {
        const reservas = yield reservaHabitacionModel_1.ReservaHabitacion.findAll({ where: { ID_USUARIO_RESERVA_HABITACION: id_usuario } });
        res.json(reservas);
    }
    catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al obtener las reservas de habitacion del usuario: :" + id_usuario,
            error
        });
    }
    ;
});
exports.getReservasHabitacion = getReservasHabitacion;
const deleteReservaHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_reserva } = req.params;
    const reserva = yield reservaHabitacionModel_1.ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "La reserva de habitacion ingresada no existe"
        });
    }
    try {
        yield reservaHabitacionModel_1.ReservaHabitacion.destroy({ where: { ID_RESERVA_HABITACION: id_reserva } });
        return res.json({
            msg: "Se ha eliminado la reserva de habitacion " + id_reserva
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al eliminar la reserva de habitacion: " + id_reserva,
            error
        });
    }
    ;
});
exports.deleteReservaHabitacion = deleteReservaHabitacion;
const updateReservaHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_reserva } = req.params;
    const { fecha_inicio, fecha_final, nombre1_huesped, nombre2_huesped, apellido1_huesped, apellido2_huesped, edad_huesped, rut_huesped, direccion_huesped, telefono_huesped, anticipo } = req.body;
    const reserva = yield reservaHabitacionModel_1.ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "No existe un reserva de habitacion con el id: " + id_reserva
        });
    }
    try {
        const rutHuesped = reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.RUT_HUESPED;
        const estaraOcupadaInicio = yield reservaHabitacionModel_1.ReservaHabitacion.findAll({
            where: {
                ID_ESTADO_PAGO_RESERVA_HABITACION: 1,
                ID_HABITACION_RESERVA_HABITACION: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_HABITACION_RESERVA_HABITACION,
                RUT_HUESPED: { [sequelize_1.Op.ne]: rutHuesped },
                [sequelize_1.Op.or]: [
                    {
                        FECHA_INICIO: {
                            [sequelize_1.Op.between]: [fecha_inicio, fecha_final]
                        }
                    },
                    {
                        [sequelize_1.Op.and]: [
                            { FECHA_INICIO: { [sequelize_1.Op.lte]: fecha_inicio } },
                            { FECHA_FINAL: { [sequelize_1.Op.gte]: fecha_inicio } }
                        ]
                    }
                ]
            }
        });
        const estaraOcupadaFinal = yield reservaHabitacionModel_1.ReservaHabitacion.findAll({
            where: {
                ID_ESTADO_PAGO_RESERVA_HABITACION: 1,
                ID_HABITACION_RESERVA_HABITACION: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_HABITACION_RESERVA_HABITACION,
                RUT_HUESPED: { [sequelize_1.Op.ne]: rutHuesped },
                [sequelize_1.Op.or]: [
                    {
                        FECHA_FINAL: {
                            [sequelize_1.Op.between]: [fecha_inicio, fecha_final]
                        }
                    },
                    {
                        [sequelize_1.Op.and]: [
                            { FECHA_INICIO: { [sequelize_1.Op.lte]: fecha_final } },
                            { FECHA_FINAL: { [sequelize_1.Op.gte]: fecha_final } }
                        ]
                    }
                ]
            }
        });
        if (estaraOcupadaInicio.length > 0 && estaraOcupadaFinal.length > 0) {
            return res.json({
                msg: "Debe cambiar la fecha de inicio y final de la reserva, ya que ambas coinciden con reservas de la habitación " + (reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_HABITACION_RESERVA_HABITACION)
            });
        }
        if (estaraOcupadaInicio.length > 0) {
            return res.json({
                msg: "La habitación " + (reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_HABITACION_RESERVA_HABITACION) + " ya está ocupada en la fecha de inicio seleccionada"
            });
        }
        if (estaraOcupadaFinal.length > 0) {
            return res.json({
                msg: "La habitación " + (reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_HABITACION_RESERVA_HABITACION) + " ya está ocupada en la fecha de finalización seleccionada"
            });
        }
        const habitacion = yield habitacionModel_1.Habitacion.findOne({ where: { ID_HABITACION: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_HABITACION_RESERVA_HABITACION } });
        var fecha_inicio_convertida = new Date(reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.FECHA_INICIO);
        var fecha_final_convertida = new Date(reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.FECHA_FINAL);
        if (fecha_inicio) {
            var fecha_inicio_convertida = new Date(fecha_inicio);
        }
        if (fecha_final) {
            var fecha_final_convertida = new Date(fecha_final);
        }
        // Restar las marcas de tiempo en milisegundos
        const diferenciaEnMilisegundos = fecha_final_convertida.getTime() - fecha_inicio_convertida.getTime();
        // Convertir la diferencia de milisegundos a días
        const cantidad_dias_reserva = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
        var nuevoanticipo = reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ANTICIPO;
        var nuevoTotal = (reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.TOTAL) * 1;
        if (anticipo) {
            var nuevoanticipo = (reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ANTICIPO) + anticipo;
            var nuevoTotal = ((habitacion === null || habitacion === void 0 ? void 0 : habitacion.dataValues.PRECIO_POR_NOCHE) * cantidad_dias_reserva) - nuevoanticipo;
        }
        yield reservaHabitacionModel_1.ReservaHabitacion.update({
            "FECHA_INICIO": fecha_inicio_convertida,
            "FECHA_FINAL": fecha_final_convertida,
            "NOMBRE1_HUESPED": nombre1_huesped,
            "NOMBRE2_HUESPED": nombre2_huesped,
            "APELLIDO1_HUESPED": apellido1_huesped,
            "APELLIDO2_HUESPED": apellido2_huesped,
            "EDAD_HUESPED": edad_huesped,
            "RUT_HUESPED": rut_huesped,
            "DIRECCION_HUESPED": direccion_huesped,
            "TELEFONO_HUESPED": telefono_huesped,
            "ANTICIPO": nuevoanticipo,
            "TOTAL": nuevoTotal
        }, { where: { ID_RESERVA_HABITACION: id_reserva } });
        const updatedReserva = yield reservaHabitacionModel_1.ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
        const nuevaFechaInicio = new Date(updatedReserva === null || updatedReserva === void 0 ? void 0 : updatedReserva.dataValues.FECHA_INICIO);
        const hoy = new Date();
        if (new Date(updatedReserva === null || updatedReserva === void 0 ? void 0 : updatedReserva.dataValues.FECHA_INICIO).toDateString() === hoy.toDateString()) {
            yield habitacionModel_1.Habitacion.update({
                ID_ESTADO_HABITACION: 2
            }, { where: { ID_HABITACION: habitacion === null || habitacion === void 0 ? void 0 : habitacion.dataValues.ID_HABITACION } });
        }
        if (nuevaFechaInicio < hoy) {
            yield habitacionModel_1.Habitacion.update({
                ID_ESTADO_HABITACION: 2
            }, { where: { ID_HABITACION: habitacion === null || habitacion === void 0 ? void 0 : habitacion.dataValues.ID_HABITACION } });
        }
        if (nuevaFechaInicio > hoy) {
            console.log(habitacion === null || habitacion === void 0 ? void 0 : habitacion.dataValues.ID_HABITACION);
            yield habitacionModel_1.Habitacion.update({
                ID_ESTADO_HABITACION: 1
            }, { where: { ID_HABITACION: habitacion === null || habitacion === void 0 ? void 0 : habitacion.dataValues.ID_HABITACION } });
        }
        res.json({
            msg: "Se ha actualizado la reserva de habitacion correctamente"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al actualizar la reserva de habitación: " + id_reserva,
            error
        });
    }
});
exports.updateReservaHabitacion = updateReservaHabitacion;
const agregarProductoReservaHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_reserva } = req.params;
    const { id_producto, cantidad } = req.body;
    const t = yield dbConnection_1.default.transaction(); //para el rollback
    const reserva = yield reservaHabitacionModel_1.ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "No existe una reserva de habitacion con el id: " + id_reserva
        });
    }
    ;
    const producto = yield productoModel_1.Producto.findOne({ where: { ID_PRODUCTO: id_producto } });
    if (!producto) {
        return res.status(404).json({
            msg: "No existe un producto con el id: " + id_producto
        });
    }
    ;
    try {
        const totalProductos = (producto === null || producto === void 0 ? void 0 : producto.dataValues.PRECIO_PRODUCTO) * cantidad;
        yield detalleReservaHabitacionProductoModel_1.DetalleReservaHabitacionProducto.create({
            "CANTIDAD": cantidad,
            "TOTAL": totalProductos,
            "ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO": id_producto,
            "ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO": id_reserva
        });
        yield reservaHabitacionModel_1.ReservaHabitacion.update({
            "TOTAL": totalProductos + (reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.TOTAL)
        }, { where: { ID_RESERVA_HABITACION: id_reserva } });
        yield t.commit(); // si no hay errores en la transacción, commiteamos
        res.json({
            msg: "Se ha agregado correctamente el producto " + id_producto + " a la reserva de habitacion " + id_reserva
        });
    }
    catch (error) {
        yield t.rollback(); // si hay errores, rollback
        res.status(500).json({
            msg: "Ha ocurrido un error al añadir el producto con id: " + id_producto + " a la reserva de habitacion " + id_reserva,
            error
        });
    }
});
exports.agregarProductoReservaHabitacion = agregarProductoReservaHabitacion;
const updateProductoReservaHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_reserva } = req.params;
    const { id_producto, cantidad } = req.body;
    const t = yield dbConnection_1.default.transaction(); //para el rollback
    const reserva = yield reservaHabitacionModel_1.ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "No existe una reserva con el id: " + id_reserva
        });
    }
    ;
    const producto = yield productoModel_1.Producto.findOne({ where: { ID_PRODUCTO: id_producto } });
    if (!producto) {
        return res.status(404).json({
            msg: "No existe un producto con el id: " + id_producto
        });
    }
    ;
    const detalleReservaProducto = yield detalleReservaHabitacionProductoModel_1.DetalleReservaHabitacionProducto.findOne({
        where: {
            ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO: id_producto,
            ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO: id_reserva
        }
    });
    if (!detalleReservaProducto) {
        return res.status(404).json({
            msg: "Aún no se ha agregado ningún producto con id: " + id_producto + " a la reserva con id " + id_reserva
        });
    }
    ;
    try {
        if (cantidad == 0) {
            const totalReservaBorrar = reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.TOTAL;
            const totalProductosBorrar = detalleReservaProducto === null || detalleReservaProducto === void 0 ? void 0 : detalleReservaProducto.dataValues.TOTAL;
            yield reservaHabitacionModel_1.ReservaHabitacion.update({
                "TOTAL": totalReservaBorrar - totalProductosBorrar
            }, { where: { ID_RESERVA_HABITACION: id_reserva } });
            yield detalleReservaHabitacionProductoModel_1.DetalleReservaHabitacionProducto.destroy({
                where: {
                    ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO: id_producto,
                    ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO: id_reserva
                }
            });
            yield t.commit();
            return res.json({
                msg: "Se han quitado todos los productos con id " + id_producto + " de la reserva " + id_reserva
            });
        }
        const totalReservaActual = reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.TOTAL;
        const totalProductosActual = detalleReservaProducto === null || detalleReservaProducto === void 0 ? void 0 : detalleReservaProducto.dataValues.TOTAL;
        yield reservaHabitacionModel_1.ReservaHabitacion.update({
            "TOTAL": totalReservaActual - totalProductosActual
        }, { where: { ID_RESERVA_HABITACION: id_reserva } });
        yield detalleReservaHabitacionProductoModel_1.DetalleReservaHabitacionProducto.update({
            "CANTIDAD": cantidad,
            "TOTAL": (producto === null || producto === void 0 ? void 0 : producto.dataValues.PRECIO_PRODUCTO) * cantidad
        }, {
            where: {
                ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO: id_producto,
                ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO: id_reserva
            }
        });
        const reservaActual = yield reservaHabitacionModel_1.ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
        yield reservaHabitacionModel_1.ReservaHabitacion.update({
            "TOTAL": (reservaActual === null || reservaActual === void 0 ? void 0 : reservaActual.dataValues.TOTAL) + (producto === null || producto === void 0 ? void 0 : producto.dataValues.PRECIO_PRODUCTO) * cantidad
        }, { where: { ID_RESERVA_HABITACION: id_reserva } });
        yield t.commit(); // si no hay errores en la transacción, commiteamos
        res.json({
            msg: "Se ha actualizado correctamente el número de productos con id " + id_producto + " en la reserva " + id_reserva
        });
    }
    catch (error) {
        yield t.rollback(); // si hay errores, rollback
        res.status(500).json({
            msg: "Ha ocurrido un error al actualizar el número de productos con id: " + id_producto + " en la reserva " + id_reserva,
            error
        });
    }
});
exports.updateProductoReservaHabitacion = updateProductoReservaHabitacion;
const verificarEstadosHabitacion = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fechaHoy = new Date();
        const reservasHoy = yield reservaHabitacionModel_1.ReservaHabitacion.findAll({
            where: {
                FECHA_INICIO: fechaHoy.toISOString().split('T')[0],
            },
        });
        for (const reserva of reservasHoy) {
            const habitacion = yield habitacionModel_1.Habitacion.findOne({ where: { ID_HABITACION: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_HABITACION_RESERVA_HABITACION } });
            if ((habitacion === null || habitacion === void 0 ? void 0 : habitacion.dataValues.ID_ESTADO_HABITACION) == 1) {
                yield habitacionModel_1.Habitacion.update({ ID_ESTADO_HABITACION: 2 }, { where: { ID_HABITACION: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_HABITACION_RESERVA_HABITACION } });
                console.log(`Habitacion ${reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_HABITACION_RESERVA_HABITACION} actualizada a 'Ocupada'`);
            }
        }
    }
    catch (error) {
        console.error("Error verificando estados de habitaciones:", error);
    }
});
exports.verificarEstadosHabitacion = verificarEstadosHabitacion;
const finalizarReservaHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_reserva } = req.params;
    const { trigger } = req.body;
    const reserva = yield reservaHabitacionModel_1.ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "No existe una reserva con el id: " + id_reserva
        });
    }
    ;
    try {
        if (trigger == 1) {
            yield reservaHabitacionModel_1.ReservaHabitacion.update({
                "ID_ESTADO_PAGO_RESERVA_HABITACION": 3
            }, { where: { ID_RESERVA_HABITACION: id_reserva } });
            yield habitacionModel_1.Habitacion.update({
                "ID_ESTADO_HABITACION": 1
            }, { where: { ID_HABITACION: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_HABITACION_RESERVA_HABITACION } });
            return res.json({
                msg: "La reserva de habitacion " + id_reserva + " ha sido finalizada correctamente"
            });
        }
        if (trigger == 0) {
            yield reservaHabitacionModel_1.ReservaHabitacion.update({
                "ID_ESTADO_PAGO_RESERVA_HABITACION": 2
            }, { where: { ID_RESERVA_HABITACION: id_reserva } });
            yield habitacionModel_1.Habitacion.update({
                "ID_ESTADO_HABITACION": 1
            }, { where: { ID_HABITACION: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_HABITACION_RESERVA_HABITACION } });
            return res.json({
                msg: "La reserva de habitacion " + id_reserva + " ha sido cancelada correctamente"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al finalizar la reserva de habitacion",
            error
        });
    }
});
exports.finalizarReservaHabitacion = finalizarReservaHabitacion;
