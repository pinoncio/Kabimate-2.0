import { Router } from 'express';
import { activarCategoria, getCategoria, getCategorias, newCategoria, updateCategoria, deleteCategoria } from '../controllers/categoriaController';

const router = Router();

router.post('/:id_usuario', newCategoria as any);
router.put('/update/:id_categoria', updateCategoria as any);
router.put('/activar/:id_categoria', activarCategoria as any)
router.delete('/delete/:id_categoria', deleteCategoria as any);
router.get('/list/:id_usuario', getCategorias as any);
router.get('/:id_categoria', getCategoria as any);


export default router;