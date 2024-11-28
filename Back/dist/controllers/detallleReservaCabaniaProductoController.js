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
exports.getDetalleReservaProductoCabania = void 0;
const detalleReservaCabaniaProductoModel_1 = require("../models/detalleReservaCabaniaProductoModel");
const reservaCabaniaModel_1 = require("../models/reservaCabaniaModel");
const getDetalleReservaProductoCabania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_reserva } = req.params;
    const reserva = yield reservaCabaniaModel_1.ReservaCabania.findOne({ where: { ID_RESERVA_CABANIA: id_reserva } });
    if (!reserva) {
        return res.json({
            msg: "No existe una reserva con el id " + id_reserva
        });
    }
    try {
        const detalleReservaCabaniaProducto = yield detalleReservaCabaniaProductoModel_1.DetalleReservaCabaniaProducto.findAll({ where: { ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO: id_reserva } });
        res.json(detalleReservaCabaniaProducto);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error al obtener el detalle de los productos asociados a la reserva " + id_reserva
        });
    }
});
exports.getDetalleReservaProductoCabania = getDetalleReservaProductoCabania;
