import { Institucion } from "../../models/institucionModel";

export async function seedInstituciones() {
    const institucionesExistentes = await Institucion.count();
    if (institucionesExistentes == 0) {
        await Institucion.bulkCreate([
        { NOMBRE_INSTITUCION: 'No Aplica', TIPO_INSTITUCION: 'No Aplica', ESTADO_INSTITUCION: true },
    ]);
    }
};
