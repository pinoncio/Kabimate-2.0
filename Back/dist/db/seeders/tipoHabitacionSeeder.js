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
exports.seedTipoHabitacion = seedTipoHabitacion;
const tipoHabitacionModel_1 = require("../../models/tipoHabitacionModel");
function seedTipoHabitacion() {
    return __awaiter(this, void 0, void 0, function* () {
        const tipoHabitacionExistentes = yield tipoHabitacionModel_1.TipoHabitacion.count();
        if (tipoHabitacionExistentes == 0) {
            yield tipoHabitacionModel_1.TipoHabitacion.bulkCreate([
                { NOMBRE_TIPO_HABITACION: 'Individual', DESCRIPCION_TIPO_HABITACION: 'Habitación destinada para una persona, con una cama individual.' },
                { NOMBRE_TIPO_HABITACION: 'Doble', DESCRIPCION_TIPO_HABITACION: 'Habitación con capacidad para dos personas, con una cama doble o dos camas individuales.' },
                { NOMBRE_TIPO_HABITACION: 'Suite', DESCRIPCION_TIPO_HABITACION: 'Habitación de lujo que incluye una sala de estar separada, ideal para estancias prolongadas.' },
                { NOMBRE_TIPO_HABITACION: 'Triple', DESCRIPCION_TIPO_HABITACION: 'Habitación con capacidad para tres personas, generalmente con una cama doble y una individual.' },
                { NOMBRE_TIPO_HABITACION: 'Cuádruple', DESCRIPCION_TIPO_HABITACION: 'Habitación para cuatro personas, puede contar con varias camas individuales o una cama doble y dos individuales.' },
                { NOMBRE_TIPO_HABITACION: 'Presidencial', DESCRIPCION_TIPO_HABITACION: 'Habitación de lujo de alto nivel, con servicios exclusivos y vistas panorámicas.' }
            ]);
        }
    });
}
;
