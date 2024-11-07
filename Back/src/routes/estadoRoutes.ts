import { Router } from "express";
import { getEstado, getEstados } from "../controllers/estadoController";

const router = Router();

router.get('/list', getEstados as any);
router.get('/:id_estado', getEstado as any);



export default router;