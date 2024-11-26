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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarEstadosCabania = exports.updateReservaCabania = exports.deleteReservaCabania = exports.getReservasCabania = exports.getReservaCabania = exports.newReservaCabania = void 0;
const reservaCabaniaModel_1 = require("../models/reservaCabaniaModel");
const usuarioModel_1 = require("../models/usuarioModel");
const caba_aModel_1 = require("../models/caba\u00F1aModel");
const sequelize_1 = require("sequelize");
const newReservaCabania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { fecha_inicio, fecha_final, nombre1_huesped, nombre2_huesped, apellido1_huesped, apellido2_huesped, edad_huesped, rut_huesped, direccion_huesped, telefono_huesped, anticipo, id_cabania } = req.body;
    const usuario = yield usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(400).json({
            msg: "El usuario ingresado no existe"
        });
    }
    ;
    if (!fecha_inicio || !fecha_final || !nombre1_huesped || !nombre2_huesped || !apellido1_huesped || !apellido2_huesped || !edad_huesped || !rut_huesped || !direccion_huesped || !telefono_huesped || !id_cabania) {
        return res.json({
            msg: "Todos los campos deben ser llenados"
        });
    }
    ;
    const cabania = yield caba_aModel_1.Cabania.findOne({ where: { ID_CABANIA: id_cabania } });
    if ((cabania === null || cabania === void 0 ? void 0 : cabania.dataValues.ID_ESTADO_CABANIA) == 2) {
        return res.json({
            msg: "No puede reservar la cabaña porque actualmente se encuentra ocupada"
        });
    }
    ;
    if ((cabania === null || cabania === void 0 ? void 0 : cabania.dataValues.ID_ESTADO_CABANIA) == 3) {
        return res.json({
            msg: "No puede reservar la cabaña porque actualmente se encuentra en mantencion"
        });
    }
    ;
    const estaraOcupada = yield reservaCabaniaModel_1.ReservaCabania.findAll({
        where: {
            ID_CABANIA_RESERVA_CABANIA: id_cabania,
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
            msg: "La cabaña ya tiene reservas en ese rango de fechas"
        });
    }
    const fecha_inicio_convertida = new Date(fecha_inicio);
    const fecha_final_convertida = new Date(fecha_final);
    // Restar las marcas de tiempo en milisegundos
    const diferenciaEnMilisegundos = fecha_final_convertida.getTime() - fecha_inicio_convertida.getTime();
    // Convertir la diferencia de milisegundos a días
    const cantidad_dias_reserva = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    const nuevoTotal = ((cabania === null || cabania === void 0 ? void 0 : cabania.dataValues.PRECIO_POR_NOCHE) * cantidad_dias_reserva) - anticipo;
    try {
        yield reservaCabaniaModel_1.ReservaCabania.create({
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
            "ID_CABANIA_RESERVA_CABANIA": id_cabania,
            "ID_USUARIO_RESERVA_CABANIA": id_usuario
        });
        const hoy = new Date();
        if (new Date(fecha_inicio).toDateString() === hoy.toDateString()) {
            yield caba_aModel_1.Cabania.update({
                ID_ESTADO_CABANIA: 2
            }, { where: { ID_CABANIA: id_cabania } });
        }
        return res.status(201).json({
            msg: 'La reserva de la cabaña ' + id_cabania + " ha sido exitosa"
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error al crear la reserva de la cabaña con id: " + id_cabania,
            error
        });
    }
    ;
});
exports.newReservaCabania = newReservaCabania;
const getReservaCabania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_reserva } = req.params;
    try {
        const reserva = yield reservaCabaniaModel_1.ReservaCabania.findOne({ where: { ID_RESERVA_CABANIA: id_reserva } });
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
            msg: "Ha ocurrido un error al obtener la reserva de cabaña con id: " + id_reserva,
            error
        });
    }
    ;
});
exports.getReservaCabania = getReservaCabania;
const getReservasCabania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const usuario = yield usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(404).json({
            msg: "El usuario ingresado no existe"
        });
    }
    ;
    try {
        const reservas = yield reservaCabaniaModel_1.ReservaCabania.findAll({ where: { ID_USUARIO_RESERVA_CABANIA: id_usuario } });
        res.json(reservas);
    }
    catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al obtener las reservas de cabañas del usuario: :" + id_usuario,
            error
        });
    }
    ;
});
exports.getReservasCabania = getReservasCabania;
const deleteReservaCabania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_reserva } = req.params;
    const reserva = yield reservaCabaniaModel_1.ReservaCabania.findOne({ where: { ID_RESERVA: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "La reserva ingresada no existe"
        });
    }
    try {
        yield reservaCabaniaModel_1.ReservaCabania.destroy({ where: { ID_RESERVA: id_reserva } });
        return res.json({
            msg: "Se ha eliminado la reserva " + id_reserva
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al eliminar la reserva de cabañas: " + id_reserva,
            error
        });
    }
    ;
});
exports.deleteReservaCabania = deleteReservaCabania;
const updateReservaCabania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_reserva } = req.params;
    const { fecha_inicio, fecha_final, nombre1_huesped, nombre2_huesped, apellido1_huesped, apellido2_huesped, edad_huesped, rut_huesped, direccion_huesped, telefono_huesped, anticipo } = req.body;
    const reserva = yield reservaCabaniaModel_1.ReservaCabania.findOne({ where: { ID_RESERVA_CABANIA: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "No existe un reserva con el id: " + id_reserva
        });
    }
    ;
    try {
        const rutHuesped = reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.RUT_HUESPED;
        const estaraOcupadaInicio = yield reservaCabaniaModel_1.ReservaCabania.findAll({
            where: {
                ID_CABANIA_RESERVA_CABANIA: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_CABANIA_RESERVA_CABANIA, RUT_HUESPED: { [sequelize_1.Op.ne]: rutHuesped },
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
        console.log("1");
        const estaraOcupadaFinal = yield reservaCabaniaModel_1.ReservaCabania.findAll({
            where: {
                ID_CABANIA_RESERVA_CABANIA: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_CABANIA_RESERVA_CABANIA, RUT_HUESPED: { [sequelize_1.Op.ne]: rutHuesped },
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
        console.log("2");
        if (estaraOcupadaInicio.length > 0 && estaraOcupadaFinal.length > 0) {
            return res.json({
                msg: "Debe cambiar la fecha de inicio y final de la reserva, ya que ambas coinciden con reservas de la cabaña " + (reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_CABANIA_RESERVA_CABANIA)
            });
        }
        if (estaraOcupadaInicio.length > 0) {
            return res.json({
                msg: "La cabaña " + (reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_CABANIA_RESERVA_CABANIA) + " ya está ocupada en la fecha de inicio seleccionada"
            });
        }
        if (estaraOcupadaFinal.length > 0) {
            return res.json({
                msg: "La cabaña " + (reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_CABANIA_RESERVA_CABANIA) + " ya está ocupada en la fecha de finalización seleccionada"
            });
        }
        const cabania = yield caba_aModel_1.Cabania.findOne({ where: { ID_CABANIA: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_CABANIA_RESERVA_CABANIA } });
        var fecha_inicio_convertida = new Date(reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.FECHA_INICIO);
        var fecha_final_convertida = new Date(reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.FECHA_FINAL);
        if (fecha_inicio) {
            var fecha_inicio_convertida = new Date(fecha_inicio);
        }
        if (fecha_final) {
            var fecha_final_convertida = new Date(fecha_final);
        }
        ;
        // Restar las marcas de tiempo en milisegundos
        const diferenciaEnMilisegundos = fecha_final_convertida.getTime() - fecha_inicio_convertida.getTime();
        // Convertir la diferencia de milisegundos a días
        const cantidad_dias_reserva = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
        var nuevoanticipo = reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ANTICIPO;
        var nuevoTotal = (reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.TOTAL) * 1;
        if (anticipo) {
            var nuevoanticipo = (reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ANTICIPO) + anticipo;
            var nuevoTotal = ((cabania === null || cabania === void 0 ? void 0 : cabania.dataValues.PRECIO_POR_NOCHE) * cantidad_dias_reserva) - nuevoanticipo;
        }
        // console.log(nuevoanticipo, nuevoTotal)
        yield reservaCabaniaModel_1.ReservaCabania.update({
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
        }, { where: { ID_RESERVA_CABANIA: id_reserva } });
        res.json({
            msg: "Se ha actualizado la reserva correctamente"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al actualizar la reserva de cabaña: " + id_reserva,
            error
        });
    }
});
exports.updateReservaCabania = updateReservaCabania;
const verificarEstadosCabania = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fechaHoy = new Date();
        const reservasHoy = yield reservaCabaniaModel_1.ReservaCabania.findAll({
            where: {
                FECHA_INICIO: fechaHoy.toISOString().split('T')[0],
            },
        });
        for (const reserva of reservasHoy) {
            const cabaña = yield caba_aModel_1.Cabania.findOne({ where: { ID_CABANIA: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_CABANIA_RESERVA_CABANIA } });
            if ((cabaña === null || cabaña === void 0 ? void 0 : cabaña.dataValues.ID_ESTADO_CABANIA) == 1) {
                yield caba_aModel_1.Cabania.update({ ID_ESTADO_CABANIA: 2 }, { where: { ID_CABANIA: reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_CABANIA_RESERVA_CABANIA } });
                console.log(`Cabaña ${reserva === null || reserva === void 0 ? void 0 : reserva.dataValues.ID_CABANIA_RESERVA_CABANIA} actualizada a 'Ocupada'`);
            }
        }
    }
    catch (error) {
        console.error("Error verificando estados de cabañas:", error);
    }
});
exports.verificarEstadosCabania = verificarEstadosCabania;
