import { Rol } from "../../models/rolModel";

export async function seedRoles() {
    const rolExistentes = await Rol.count();
    if (rolExistentes == 0) {
        await Rol.bulkCreate([
        { NOMBRE_ROL: 'Administrador', ESTADO_ROL: true },
        { NOMBRE_ROL: 'Usuario', ESTADO_ROL: true }
    ]);
    }
};
