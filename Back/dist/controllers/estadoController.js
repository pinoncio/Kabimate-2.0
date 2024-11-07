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
exports.getEstado = exports.getEstados = void 0;
const estadoModel_1 = require("../models/estadoModel");
const getEstados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estados = yield estadoModel_1.Estado.findAll();
        res.json(estados);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error al obtener los estados de los inmuebles',
            error
        });
    }
});
exports.getEstados = getEstados;
const getEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_estado } = req.params;
    try {
        const estado = yield estadoModel_1.Estado.findOne({ where: { ID_ESTADO: id_estado } });
        if (!estado) {
            return res.status(400).json({
                msg: 'No se ha encontrado el estado con id: ' + id_estado
            });
        }
        ;
        res.json(estado);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener el estado',
            error
        });
    }
});
exports.getEstado = getEstado;
