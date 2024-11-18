import {Request, Response} from 'express';
import { TipoHabitacion } from '../models/tipoHabitacionModel';

export const getTipos = async(req: Request, res: Response) =>{ 
    try {
        const tipos = await TipoHabitacion.findAll();
        res.json(tipos)
    }catch (error) {
        res.status(500).json({ 
            msg: 'Error al obtener la lista de tipos de habitacion.',
        error
    });
    }
};
export const getTipo = async(req: Request, res: Response) =>{
    const { id_tipo_habitacion} =  req.params;
    try{
        const tipo = await TipoHabitacion.findOne({where: {ID_TIPO_HABITACION: id_tipo_habitacion}})
        if (!tipo) {
            return res.status(404).json({
                msg: "El tipo de habitacion con id: " + id_tipo_habitacion + " no existe"
            })
        }
        res.json(tipo)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el tipo de habitacion con id: '+id_tipo_habitacion,
                error
            })
        }
};