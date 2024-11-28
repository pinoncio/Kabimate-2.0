"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detallleReservaCabaniaProductoController_1 = require("../controllers/detallleReservaCabaniaProductoController");
const router = (0, express_1.Router)();
router.get('/list/:id_reserva', detallleReservaCabaniaProductoController_1.getDetalleReservaProductoCabania);
exports.default = router;
