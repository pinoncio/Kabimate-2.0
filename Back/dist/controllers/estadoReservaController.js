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
exports.getEstadoPago = exports.getEstadosPago = void 0;
const estadoPagoModel_1 = require("../models/estadoPagoModel");
const getEstadosPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estados = yield estadoPagoModel_1.EstadoPago.findAll();
        res.json(estados);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener la lista de estados de reserva.',
            error
        });
    }
});
exports.getEstadosPago = getEstadosPago;
const getEstadoPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_estado } = req.params;
    try {
        const estado = yield estadoPagoModel_1.EstadoPago.findOne({ where: { ID_ESTADO_PAGO: id_estado } });
        res.json(estado);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el estado de reserva.',
            error
        });
    }
});
exports.getEstadoPago = getEstadoPago;
