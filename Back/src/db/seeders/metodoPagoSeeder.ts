import { MetodoPago } from "../../models/metodoPagoModel";

export async function seedMetodosPagos() {
    const metodosPagosExistentes = await MetodoPago.count();
    if (metodosPagosExistentes == 0) {
        await MetodoPago.bulkCreate([
        { NOMBRE_METODO_PAGO: 'Efectivo'},
        { NOMBRE_METODO_PAGO: 'Tarjeta'}
    ]);
    }
};
