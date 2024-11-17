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
exports.activarPiso = exports.getPiso = exports.deletePiso = exports.updatePiso = exports.newPiso = exports.getPisos = void 0;
const pisoModel_1 = require("../models/pisoModel");
const usuarioModel_1 = require("../models/usuarioModel");
const getPisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const usuario = yield usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(404).json({
            msg: 'El usuario: ' + id_usuario + ' no existe'
        });
    }
    try {
        const pisos = yield pisoModel_1.Piso.findAll({ where: { ID_USUARIO_PISO: id_usuario } });
        res.json(pisos);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener la lista de pisos.',
            error
        });
    }
});
exports.getPisos = getPisos;
const newPiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { nombre_piso } = req.body;
    try {
        yield pisoModel_1.Piso.create({
            "NOMBRE_PISO": nombre_piso,
            "ESTADO_PISO": true,
            "ID_USUARIO_PISO": id_usuario
        });
        return res.status(201).json({
            msg: 'Piso creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear el piso',
            error
        });
    }
});
exports.newPiso = newPiso;
const updatePiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_piso } = req.params;
    const { nombre_piso } = req.body;
    const piso = yield pisoModel_1.Piso.findOne({ where: { ID_PISO: id_piso } });
    if (!piso) {
        return res.status(404).json({
            msg: "no existe un piso con id: " + id_piso
        });
    }
    try {
        yield pisoModel_1.Piso.update({
            NOMBRE_PISO: nombre_piso
        }, { where: { ID_PISO: id_piso } });
        return res.json({
            msg: 'Piso con id: ' + id_piso + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el piso: ' + id_piso,
            error
        });
    }
});
exports.updatePiso = updatePiso;
const deletePiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_piso } = req.params;
    const piso = yield pisoModel_1.Piso.findOne({ where: { ID_PISO: id_piso } });
    if (!piso) {
        return res.status(404).json({
            msg: "El piso con id: " + id_piso + " no existe"
        });
    }
    try {
        yield pisoModel_1.Piso.destroy({ where: { ID_PISO: id_piso } });
        return res.json({
            msg: 'Piso con id ' + id_piso + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al borrar el piso con id: ' + id_piso,
            error
        });
    }
});
exports.deletePiso = deletePiso;
const getPiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_piso } = req.params;
    try {
        const piso = yield pisoModel_1.Piso.findOne({ where: { ID_PISO: id_piso } });
        if (!piso) {
            return res.status(404).json({
                msg: "El piso con id: " + id_piso + " no existe"
            });
        }
        res.json(piso);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el piso con id: ' + id_piso,
            error
        });
    }
});
exports.getPiso = getPiso;
const activarPiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_piso } = req.params;
    const { trigger } = req.body;
    const piso = yield pisoModel_1.Piso.findOne({ where: { ID_PISO: id_piso } });
    if (!piso) {
        return res.status(404).json({
            msg: "El piso ingresado no existe"
        });
    }
    try {
        if (trigger == 1) {
            yield pisoModel_1.Piso.update({
                ESTADO_PISO: true
            }, { where: { ID_PISO: id_piso } });
            return res.json({
                msg: "Se ha activado el piso con id: " + id_piso + " correctamente"
            });
        }
        else {
            yield pisoModel_1.Piso.update({
                ESTADO_PISO: false
            }, { where: { ID_PISO: id_piso } });
            return res.json({
                msg: "Se ha desactivado el piso con id: " + id_piso + " correctamente"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error al cambiar el estado del piso con id: " + id_piso,
            error
        });
    }
});
exports.activarPiso = activarPiso;
