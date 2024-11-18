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
exports.updateHabitacion = exports.activarHabitacion = exports.getHabitaciones = exports.getHabitacion = exports.newHabitacion = void 0;
const habitacionModel_1 = require("../models/habitacionModel");
const usuarioModel_1 = require("../models/usuarioModel");
const newHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { numero_habitacion, capacidad, precio_por_noche, servicios_incluidos, descripcion_habitacion, id_tipo_habitacion, id_piso } = req.body;
    const usuario = yield usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(404).json({
            msg: 'El usuario: ' + id_usuario + ' no existe'
        });
    }
    try {
        yield habitacionModel_1.Habitacion.create({
            "NUMERO_HABITACION": numero_habitacion,
            "CAPACIDAD": capacidad,
            "PRECIO_POR_NOCHE": precio_por_noche,
            "SERVICIOS_INCLUIDOS": servicios_incluidos,
            "DESCRIPCION_HABITACION": descripcion_habitacion,
            "ESTADO_HABITACION": true,
            "ID_TIPO_HABITACION_HABITACION": id_tipo_habitacion,
            "ID_PISO_HABITACION": id_piso,
            "ID_ESTADO_HABITACION": 1,
            "ID_USUARIO_HABITACION": id_usuario
        });
        return res.status(201).json({
            msg: 'Habitacion creada correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al crear la habitacion',
            error
        });
    }
});
exports.newHabitacion = newHabitacion;
const getHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_habitacion } = req.params;
    try {
        const habitacion = yield habitacionModel_1.Habitacion.findOne({ where: { ID_HABITACION: id_habitacion } });
        if (!habitacion) {
            return res.status(400).json({
                msg: 'La habitacion con id: ' + id_habitacion + ' no existe'
            });
        }
        ;
        res.json(habitacion);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener la habitacion con id: ' + id_habitacion,
            error
        });
    }
    ;
});
exports.getHabitacion = getHabitacion;
const getHabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const usuario = yield usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(400).json({
            msg: 'El usuario ingresado no existe',
        });
    }
    try {
        const habitaciones = yield habitacionModel_1.Habitacion.findAll({ where: { ID_USUARIO_HABITACION: id_usuario } });
        res.json(habitaciones);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener las cabañas del usuario con id: ' + id_usuario,
            error
        });
    }
    ;
});
exports.getHabitaciones = getHabitaciones;
const activarHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_habitacion } = req.params;
    const { trigger } = req.body;
    const habitacion = yield habitacionModel_1.Habitacion.findOne({ where: { ID_HABITACION: id_habitacion } });
    if (!habitacion) {
        return res.status(404).json({
            msg: 'La habitacion con id: ' + id_habitacion + ' no existe'
        });
    }
    ;
    if (habitacion.dataValues.ID_ESTADO_HABITACION == 2) {
        return res.status(404).json({
            msg: 'La habitacion se encuentra ocupada, porfavor pruebe mas tarde'
        });
    }
    ;
    try {
        if (trigger == 1) {
            yield habitacionModel_1.Habitacion.update({
                ESTADO_HABITACION: true
            }, { where: { ID_HABITACION: id_habitacion } });
            return res.json({
                msg: 'Se ha activado la habitacion con id: ' + id_habitacion + ' correctamente'
            });
        }
        else {
            yield habitacionModel_1.Habitacion.update({
                ESTADO_HABITACION: false
            }, { where: { ID_HABITACION: id_habitacion } });
            return res.json({
                msg: 'Se ha desactivado la habitacion con id: ' + id_habitacion + ' correctamente'
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error al activar/desactivar la habitacion con id: " + id_habitacion,
            error
        });
    }
});
exports.activarHabitacion = activarHabitacion;
const updateHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_habitacion } = req.params;
    const { numero_habitacion, capacidad, precio_por_noche, servicios_incluidos, descripcion_habitacion, id_tipo_habitacion, id_piso, id_estado } = req.body;
    const habitacion = yield habitacionModel_1.Habitacion.findOne({ where: { ID_HABITACION: id_habitacion } });
    if (!habitacion) {
        return res.json({
            msg: 'No existe un habitacion con id: ' + id_habitacion
        });
    }
    ;
    if (habitacion.dataValues.ID_ESTADO_HABITACION == 2) {
        return res.status(404).json({
            msg: 'La habitacion se encuentra ocupada, porfavor pruebe mas tarde'
        });
    }
    ;
    if (habitacion.dataValues.ESTADO_HABITACION == false) {
        return res.status(404).json({
            msg: 'La habitacion se encuentra desactivada, porfavor vuelva a activarla antes de proceder'
        });
    }
    ;
    try {
        yield habitacionModel_1.Habitacion.update({
            NUMERO_HABITACION: numero_habitacion,
            CAPACIDAD: capacidad,
            PRECIO_POR_NOCHE: precio_por_noche,
            SERVICIOS_INCLUIDOS: servicios_incluidos,
            DESCRIPCION_HABITACION: descripcion_habitacion,
            ID_TIPO_HABITACION_HABITACION: id_tipo_habitacion,
            ID_PISO_HABITACION: id_piso,
            ID_ESTADO_HABITACION: id_estado
        }, { where: { ID_HABITACION: id_habitacion } });
        return res.json({
            msg: 'Se ha actualizado la informacion de la habitacion con id: ' + id_habitacion + ' correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actulizar la informacion de la habitacion ' + id_habitacion,
            error
        });
    }
    ;
});
exports.updateHabitacion = updateHabitacion;
