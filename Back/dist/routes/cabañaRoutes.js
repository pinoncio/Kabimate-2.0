"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const caba_aController_1 = require("../controllers/caba\u00F1aController");
const router = (0, express_1.Router)();
router.post('/:id_usuario', caba_aController_1.newCabaña);
// router.put('/update/:id_cabania', updateCabaña as any);
router.put('/activar/:id_cabania', caba_aController_1.activarCabaña);
// router.delete('/delete/:id_cabania', deleteCabaña as any);
router.get('/list/:id_usuario', caba_aController_1.getCabañas);
router.get('/:id_cabania', caba_aController_1.getCabaña);
exports.default = router;
