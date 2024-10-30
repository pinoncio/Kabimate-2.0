import { Router } from 'express';
import { newUsuario, activarUsuario, updateUsuario, loginUser, getUsuarios, getUsuario } from '../controllers/usuarioController';

const router = Router();

router.post('/', newUsuario as any);
router.put('/activar/:id_usuario', activarUsuario as any);
router.put('/update/:id_usuario', updateUsuario as any);
router.post('/login', loginUser as any);
router.get('/list', getUsuarios as any);
router.get('/:id_usuario', getUsuario as any);

export default router;