import { TipoHabitacion } from "../../models/tipoHabitacionModel";

export async function seedTipoHabitacion() {
    const tipoHabitacionExistentes = await TipoHabitacion.count();
    if (tipoHabitacionExistentes == 0) {
        await TipoHabitacion.bulkCreate([
            { NOMBRE_TIPO_HABITACION: 'Individual', DESCRIPCION_TIPO_HABITACION: 'Habitación destinada para una persona, con una cama individual.' },
            { NOMBRE_TIPO_HABITACION: 'Doble', DESCRIPCION_TIPO_HABITACION: 'Habitación con capacidad para dos personas, con una cama doble o dos camas individuales.' },
            { NOMBRE_TIPO_HABITACION: 'Suite', DESCRIPCION_TIPO_HABITACION: 'Habitación de lujo que incluye una sala de estar separada, ideal para estancias prolongadas.' },
            { NOMBRE_TIPO_HABITACION: 'Triple', DESCRIPCION_TIPO_HABITACION: 'Habitación con capacidad para tres personas, generalmente con una cama doble y una individual.' },
            { NOMBRE_TIPO_HABITACION: 'Cuádruple', DESCRIPCION_TIPO_HABITACION: 'Habitación para cuatro personas, puede contar con varias camas individuales o una cama doble y dos individuales.' },
            { NOMBRE_TIPO_HABITACION: 'Presidencial', DESCRIPCION_TIPO_HABITACION: 'Habitación de lujo de alto nivel, con servicios exclusivos y vistas panorámicas.' }
    ]);
    }
};
