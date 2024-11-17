import { Router } from 'express';
import { newPiso, updatePiso, activarPiso, deletePiso, getPiso, getPisos } from '../controllers/pisoController';

const router = Router();

router.post('/:id_usuario', newPiso as any);
router.put('/update/:id_piso', updatePiso as any);
router.put('/activar/:id_piso', activarPiso as any);
router.delete('/delete/:id_piso', deletePiso as any);
router.get('/list/:id_usuario', getPisos as any);
router.get('/:id_piso', getPiso as any);


export default router;