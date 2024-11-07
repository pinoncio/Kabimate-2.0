"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadoController_1 = require("../controllers/estadoController");
const router = (0, express_1.Router)();
router.get('/list', estadoController_1.getEstados);
router.get('/:id_estado', estadoController_1.getEstado);
exports.default = router;
