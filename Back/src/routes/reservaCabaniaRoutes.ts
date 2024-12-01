import { Router } from 'express';
import { newReservaCabania, getReservaCabania, getReservasCabania, updateReservaCabania, deleteReservaCabania, agregarProductoReservaCabania, updateProductoReservaCabania, finalizarReservaCabania } from '../controllers/reservaCabaniaController';

const router = Router();

router.post('/:id_usuario', newReservaCabania as any);
router.put('/update/:id_reserva', updateReservaCabania as any);
router.delete('/delete/:id_reserva', deleteReservaCabania as any);
router.get('/list/:id_usuario', getReservasCabania as any);
router.get('/:id_reserva', getReservaCabania as any);
router.put('/agregarproducto/:id_reserva', agregarProductoReservaCabania as any);
router.put('/updateproducto/:id_reserva', updateProductoReservaCabania as any);
router.put('/estadoreservacabana/:id_reserva', finalizarReservaCabania as any);


export default router;