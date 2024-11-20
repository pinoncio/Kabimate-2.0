import { Router } from 'express';
import { newProducto, updateProducto, deleteProducto, activarProducto, getProducto, getProductos } from '../controllers/productoController';

const router = Router();

router.post('/:id_usuario', newProducto as any);
router.put('/update/:id_producto', updateProducto as any);
router.put('/activar/:id_producto', activarProducto as any);
router.delete('/delete/:id_producto', deleteProducto as any);
router.get('/list/:id_usuario', getProductos as any);
router.get('/:id_producto', getProducto as any);


export default router;