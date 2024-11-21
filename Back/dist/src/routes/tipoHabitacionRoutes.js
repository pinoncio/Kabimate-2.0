"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoHabitacionController_1 = require("../controllers/tipoHabitacionController");
const router = (0, express_1.Router)();
router.get('/list', tipoHabitacionController_1.getTipos);
router.get('/:id_tipo_habitacion', tipoHabitacionController_1.getTipo);
exports.default = router;
