import { Estado } from "../../models/estadoModel";

export async function seedEstados() {
    const estadosExistentes = await Estado.count();
    if (estadosExistentes == 0) {
        await Estado.bulkCreate([
        { NOMBRE_ESTADO: 'Disponible', DESCRIPCION_ESTADO: 'La habitación está libre para reservar' },
        { NOMBRE_ESTADO: 'Ocupado', DESCRIPCION_ESTADO: 'La habitación está actualmente en uso' },
        { NOMBRE_ESTADO: 'En Mantención', DESCRIPCION_ESTADO: 'La habitación está en proceso de mantenimiento' }
    ]);
    }
};