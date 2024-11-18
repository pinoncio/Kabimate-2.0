import { Router } from 'express';
import { newHabitacion, getHabitacion, getHabitaciones, updateHabitacion, activarHabitacion } from '../controllers/habitacionController';

const router = Router();

router.post('/:id_usuario', newHabitacion as any);
router.put('/update/:id_habitacion', updateHabitacion as any);
router.put('/activar/:id_habitacion', activarHabitacion as any)
// router.delete('/delete/:id_habitacion', deleteHabitacion as any);
router.get('/list/:id_usuario', getHabitaciones as any);
router.get('/:id_habitacion', getHabitacion as any);


export default router;