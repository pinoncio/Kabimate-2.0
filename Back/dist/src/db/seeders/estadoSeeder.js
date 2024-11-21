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
exports.seedEstados = seedEstados;
const estadoModel_1 = require("../../models/estadoModel");
function seedEstados() {
    return __awaiter(this, void 0, void 0, function* () {
        const estadosExistentes = yield estadoModel_1.Estado.count();
        if (estadosExistentes == 0) {
            yield estadoModel_1.Estado.bulkCreate([
                { NOMBRE_ESTADO: 'Disponible', DESCRIPCION_ESTADO: 'La habitación está libre para reservar' },
                { NOMBRE_ESTADO: 'Ocupado', DESCRIPCION_ESTADO: 'La habitación está actualmente en uso' },
                { NOMBRE_ESTADO: 'En Mantención', DESCRIPCION_ESTADO: 'La habitación está en proceso de mantenimiento' }
            ]);
        }
    });
}
;
