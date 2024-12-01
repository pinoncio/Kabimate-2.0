"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadoReservaController_1 = require("../controllers/estadoReservaController");
const router = (0, express_1.Router)();
router.get('/list', estadoReservaController_1.getEstadosPago);
router.get('/:id_estado', estadoReservaController_1.getEstadoPago);
exports.default = router;
