import { Router } from 'express';
import { newReservaHabitacion, updateReservaHabitacion, deleteReservaHabitacion, getReservasHabitacion, getReservaHabitacion, agregarProductoReservaHabitacion, updateProductoReservaHabitacion } from '../controllers/reservaHabitacionController';

const router = Router();

router.post('/:id_usuario', newReservaHabitacion as any);
router.put('/update/:id_reserva', updateReservaHabitacion as any);
router.delete('/delete/:id_reserva', deleteReservaHabitacion as any);
router.get('/list/:id_usuario', getReservasHabitacion as any);
router.get('/:id_reserva', getReservaHabitacion as any);
router.put('/agregarproducto/:id_reserva', agregarProductoReservaHabitacion as any);
router.put('/updateproducto/:id_reserva', updateProductoReservaHabitacion as any);


export default router;