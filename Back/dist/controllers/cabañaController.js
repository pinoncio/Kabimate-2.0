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
exports.newCabaña = void 0;
const caba_aModel_1 = require("../models/caba\u00F1aModel");
const newCabaña = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { capacidad, cantidad_piezas, precio_por_noche, ubicacion, servicios_incluidos, descripcion_cabania, id_estado_cabania } = req.body;
    try {
        yield caba_aModel_1.Cabania.create({
            "CAPACIDAD": capacidad,
            "CANTIDAD_PIEZAS": cantidad_piezas,
            "PRECIO_POR_NOCHE": precio_por_noche,
            "UBICACION": ubicacion,
            "SERVICIOS_INCLUIDOS": servicios_incluidos,
            "DESCRIPCION_CABANIA": descripcion_cabania,
            "ESTADO_CABANIA": true,
            "ID_ESTADO_CABANIA": id_estado_cabania,
            "ID_USUARIO_CABANIA": id_usuario
        });
        return res.status(201).json({
            msg: 'La cabaña se ha creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al crear la cabaña',
            error
        });
    }
});
exports.newCabaña = newCabaña;
