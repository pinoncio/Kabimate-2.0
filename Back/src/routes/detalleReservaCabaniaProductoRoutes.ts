import { Router } from "express";
import { getDetalleReservaProductoCabania } from "../controllers/detallleReservaCabaniaProductoController";

const router = Router();

router.get('/list/:id_reserva', getDetalleReservaProductoCabania as any);

export default router;