import { Router } from 'express';
import { newReservaCabania, getReservaCabania, getReservasCabania } from '../controllers/reservaCabaniaController';

const router = Router();

router.post('/:id_usuario', newReservaCabania as any);
// router.put('/update/:id_producto', updateProducto as any);
// router.put('/activar/:id_producto', activarProducto as any);
// router.delete('/delete/:id_producto', deleteProducto as any);
router.get('/list/:id_usuario', getReservasCabania as any);
router.get('/:id_reserva', getReservaCabania as any);


export default router;