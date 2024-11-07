import { Request, Response } from "express";
import { Estado } from "../models/estadoModel";

export const getEstados = async(req: Request, res: Response) =>{
    try{
        const estados = await Estado.findAll();
        res.json(estados);
    }catch(error){
        res.status(400).json({
            msg: 'Error al obtener los estados de los inmuebles',
            error
        })
    }
};

export const getEstado = async(req: Request, res: Response)=>{
    const{id_estado} = req.params;

    try{
        const estado =  await Estado.findOne({where:{ ID_ESTADO: id_estado}});
        if(!estado){
            return res.status(400).json({
                msg: 'No se ha encontrado el estado con id: '+id_estado
                
            })
        };
        res.json(estado);
    }catch(error){
        res.status(400).json({
            msg:'Ha ocurrido un error al obtener el estado',
            error
        })
    }
}