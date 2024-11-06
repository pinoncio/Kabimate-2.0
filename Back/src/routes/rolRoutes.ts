import { Router } from 'express';
import { deleteRol, getRol, getRoles, newRol, updateRol, activarRol} from '../controllers/rolController';

const router = Router();

router.post('/', newRol as any);
router.put('/update/:id_rol', updateRol as any);
router.put('/activar/:id_rol', activarRol as any);
router.delete('/delete/:id_rol', deleteRol as any);
router.get('/list', getRoles as any);
router.get('/:id_rol', getRol as any);


export default router;