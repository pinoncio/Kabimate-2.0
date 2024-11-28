import { Router } from "express";
import { getDetalleReservaProductoHabitacion } from "../controllers/detalleReservaHabitacionProductoController";

const router = Router();

router.get('/list/:id_reserva', getDetalleReservaProductoHabitacion as any);

export default router;