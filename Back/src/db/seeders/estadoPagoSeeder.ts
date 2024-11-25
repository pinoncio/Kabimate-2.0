import { EstadoPago } from "../../models/estadoPagoModel";

export async function seedEstadosPagos() {
    const estadosPagosExistentes = await EstadoPago.count();
    if (estadosPagosExistentes == 0) {
        await EstadoPago.bulkCreate([
        { NOMBRE_ESTADO_PAGO: 'Pendiente'},
        { NOMBRE_ESTADO_PAGO: 'En Progreso'},
        { NOMBRE_ESTADO_PAGO: 'Finalizado'}
    ]);
    }
};
