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
exports.activarCabaña = exports.getCabañas = exports.getCabaña = exports.newCabaña = void 0;
const caba_aModel_1 = require("../models/caba\u00F1aModel");
const usuarioModel_1 = require("../models/usuarioModel");
const newCabaña = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { capacidad, cantidad_piezas, precio_por_noche, ubicacion, servicios_incluidos, descripcion_cabania, id_estado_cabania } = req.body;
    try {
        yield caba_aModel_1.Cabania.create({
            "CAPACIDAD": capacidad,
            "CANTIDAD_PIEZAS": cantidad_piezas,
            "PRECIO_POR_NOCHE": precio_por_noche,
            "UBICACION": ubicacion,
            "SERVICIOS_INCLUIDOS": servicios_incluidos,
            "DESCRIPCION_CABANIA": descripcion_cabania,
            "ESTADO_CABANIA": true,
            "ID_ESTADO_CABANIA": id_estado_cabania,
            "ID_USUARIO_CABANIA": id_usuario
        });
        return res.status(201).json({
            msg: 'La cabaña se ha creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al crear la cabaña',
            error
        });
    }
});
exports.newCabaña = newCabaña;
const getCabaña = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { id_cabaña } = req.body;
    try {
        const usuario = usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
        const cabaña = caba_aModel_1.Cabania.findOne({ where: { ID_CABANIA: id_cabaña } });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe',
            });
        }
        if (!cabaña) {
            return res.status(400).json({
                msg: 'La cabaña con id: ' + id_cabaña + ' no existe',
            });
        }
        res.json(cabaña);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener la cabaña con id: ' + id_cabaña,
            error
        });
    }
});
exports.getCabaña = getCabaña;
const getCabañas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    try {
        const usuario = usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe',
            });
        }
        const cabañas = caba_aModel_1.Cabania.findAll({ where: { ID_USUARIO_CABANIA: id_usuario } });
        res.json(cabañas);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener las cabañas del usuario: ' + id_usuario,
            error
        });
    }
});
exports.getCabañas = getCabañas;
const activarCabaña = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_cabaña, trigger } = req.body;
    try {
        const cabaña = yield caba_aModel_1.Cabania.findOne({ where: { ID_CABANIA: id_cabaña } });
        if (!cabaña) {
            return res.status(404).json({
                msg: "La cabaña con id: " + id_cabaña + ' no existe'
            });
        }
        if (trigger == 1) {
            yield caba_aModel_1.Cabania.update({
                ESTADO_CABANIA: true
            }, { where: { ID_CABANIA: id_cabaña } });
            return res.json({
                msg: "Se ha activado la cabaña con id: " + id_cabaña + " correctamente"
            });
        }
        else {
            yield caba_aModel_1.Cabania.update({
                ESTADO_CABANIA: false
            }, { where: { ID_CABANIA: id_cabaña } });
            return res.json({
                msg: "Se ha desactivado la cabaña con id: " + id_cabaña + " correctamente"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error al activar/desactivar la cabaña con id: " + id_cabaña,
            error
        });
    }
});
exports.activarCabaña = activarCabaña;
