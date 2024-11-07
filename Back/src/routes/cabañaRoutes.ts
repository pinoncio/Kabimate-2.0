import { Router } from 'express';
import {newCabaña, activarCabaña, getCabaña, getCabañas} from '../controllers/cabañaController';

const router = Router();

router.post('/', newCabaña as any);
// router.put('/update/:id_cabaña', updateCabaña as any);
router.put('/activar/:id_cabaña', activarCabaña as any)
// router.delete('/delete/:id_cabaña', deleteCabaña as any);
router.get('/list/:id_usuario', getCabañas as any);
router.get('/:id_usuario', getCabaña as any);


export default router;