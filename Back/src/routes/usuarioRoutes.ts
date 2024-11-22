import { Router } from 'express';
import { newUsuario, activarUsuario, updateUsuario, loginUser, getUsuarios, getUsuario, registroMasivo } from '../controllers/usuarioController';
import multer from 'multer';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', newUsuario as any);
router.post('/registromasivo', upload.single('file'), registroMasivo as any);
router.put('/activar/:id_usuario', activarUsuario as any);
router.put('/update/:id_usuario', updateUsuario as any);
router.post('/login', loginUser as any);
router.get('/list', getUsuarios as any);
router.get('/:id_usuario', getUsuario as any);

export default router;