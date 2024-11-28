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
exports.getDetalleReservaProductoHabitacion = void 0;
const detalleReservaHabitacionProductoModel_1 = require("../models/detalleReservaHabitacionProductoModel");
const reservaHabitacionModel_1 = require("../models/reservaHabitacionModel");
const getDetalleReservaProductoHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_reserva } = req.params;
    const reserva = yield reservaHabitacionModel_1.ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
    if (!reserva) {
        return res.json({
            msg: "No existe una reserva de habitacion con el id " + id_reserva
        });
    }
    try {
        const detalleReservaHabitacionProducto = yield detalleReservaHabitacionProductoModel_1.DetalleReservaHabitacionProducto.findAll({ where: { ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO: id_reserva } });
        res.json(detalleReservaHabitacionProducto);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error al obtener el detalle de los productos asociados a la reserva de habitacion " + id_reserva
        });
    }
});
exports.getDetalleReservaProductoHabitacion = getDetalleReservaProductoHabitacion;
