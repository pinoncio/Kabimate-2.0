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
exports.getTipo = exports.getTipos = void 0;
const tipoHabitacionModel_1 = require("../models/tipoHabitacionModel");
const getTipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tipos = yield tipoHabitacionModel_1.TipoHabitacion.findAll();
        res.json(tipos);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener la lista de tipos de habitacion.',
            error
        });
    }
});
exports.getTipos = getTipos;
const getTipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_habitacion } = req.params;
    try {
        const tipo = yield tipoHabitacionModel_1.TipoHabitacion.findOne({ where: { ID_TIPO_HABITACION: id_tipo_habitacion } });
        if (!tipo) {
            return res.status(404).json({
                msg: "El tipo de habitacion con id: " + id_tipo_habitacion + " no existe"
            });
        }
        res.json(tipo);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el tipo de habitacion con id: ' + id_tipo_habitacion,
            error
        });
    }
});
exports.getTipo = getTipo;
