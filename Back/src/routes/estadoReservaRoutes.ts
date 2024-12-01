import { Router } from 'express';
import { getEstadosPago, getEstadoPago } from '../controllers/estadoReservaController';

const router = Router();

router.get('/list', getEstadosPago as any);
router.get('/:id_estado', getEstadoPago as any);





export default router;