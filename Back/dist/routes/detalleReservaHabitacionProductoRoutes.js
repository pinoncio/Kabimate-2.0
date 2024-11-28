"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalleReservaHabitacionProductoController_1 = require("../controllers/detalleReservaHabitacionProductoController");
const router = (0, express_1.Router)();
router.get('/list/:id_reserva', detalleReservaHabitacionProductoController_1.getDetalleReservaProductoHabitacion);
exports.default = router;
