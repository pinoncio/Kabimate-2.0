"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post('/', usuarioController_1.newUsuario);
router.post('/registromasivo', upload.single('file'), usuarioController_1.registroMasivo);
router.put('/activar/:id_usuario', usuarioController_1.activarUsuario);
router.put('/update/:id_usuario', usuarioController_1.updateUsuario);
router.post('/login', usuarioController_1.loginUser);
router.get('/list', usuarioController_1.getUsuarios);
router.get('/:id_usuario', usuarioController_1.getUsuario);
exports.default = router;
