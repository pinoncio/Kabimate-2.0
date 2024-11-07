import { Router } from 'express';
import {newCabaña, activarCabaña, getCabaña, getCabañas} from '../controllers/cabañaController';

const router = Router();

router.post('/', newCabaña as any);
// router.put('/update/:id_cabania', updateCabaña as any);
router.put('/activar/:id_cabania', activarCabaña as any)
// router.delete('/delete/:id_cabania', deleteCabaña as any);
router.get('/list/:id_usuario', getCabañas as any);
router.get('/:id_cabania', getCabaña as any);


export default router;