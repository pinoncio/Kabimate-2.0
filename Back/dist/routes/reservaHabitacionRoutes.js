"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservaHabitacionController_1 = require("../controllers/reservaHabitacionController");
const router = (0, express_1.Router)();
router.post('/:id_usuario', reservaHabitacionController_1.newReservaHabitacion);
router.put('/update/:id_reserva', reservaHabitacionController_1.updateReservaHabitacion);
router.delete('/delete/:id_reserva', reservaHabitacionController_1.deleteReservaHabitacion);
router.get('/list/:id_usuario', reservaHabitacionController_1.getReservasHabitacion);
router.get('/:id_reserva', reservaHabitacionController_1.getReservaHabitacion);
router.put('/agregarproducto/:id_reserva', reservaHabitacionController_1.agregarProductoReservaHabitacion);
router.put('/updateproducto/:id_reserva', reservaHabitacionController_1.updateProductoReservaHabitacion);
exports.default = router;