import { Router } from 'express';
import { getTipo, getTipos } from '../controllers/tipoHabitacionController';

const router = Router();

router.get('/list', getTipos as any);
router.get('/:id_tipo_habitacion', getTipo as any);


export default router;