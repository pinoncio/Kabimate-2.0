import {Request, Response} from 'express';
import { Piso } from '../models/pisoModel';
import { Usuario } from '../models/usuarioModel';

export const getPisos = async(req: Request, res: Response) =>{
    const {id_usuario} = req.params;
    const usuario = await Usuario.findOne({where:{ID_USUARIO:id_usuario}});
    if(!usuario){
        return res.status(404).json({
            msg: 'El usuario: '+id_usuario+ ' no existe'
        })
    }
    try {
        const pisos = await Piso.findAll({where: {ID_USUARIO_PISO: id_usuario}});
        res.json(pisos)
    }catch (error) {
        res.status(500).json({ 
            msg: 'Error al obtener la lista de pisos.',
        error
    });
    }
};
export const newPiso = async(req: Request, res: Response) =>{
    const {id_usuario} = req.params;
    const { nombre_piso} =  req.body;
    try{
        await Piso.create({
            "NOMBRE_PISO": nombre_piso,
            "ESTADO_PISO": true,
            "ID_USUARIO_PISO": id_usuario
        })
        return res.status(201).json({
            msg: 'Piso creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear el piso',
            error
        })
    }
};
export const updatePiso = async(req: Request, res: Response) => {
    const {id_piso} = req.params;
    const {nombre_piso} = req.body;
    const piso = await Piso.findOne({where: {ID_PISO: id_piso}})
    if (!piso) {
        return res.status(404).json({
            msg: "no existe un piso con id: " + id_piso
        })
    }
    try{
        await Piso.update({
            NOMBRE_PISO: nombre_piso
            },
            {where: {ID_PISO: id_piso}}
        )
        return res.json({
            msg:'Piso con id: ' + id_piso + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el piso: '+id_piso,
                error
            })
        }
};
export const deletePiso = async(req: Request, res: Response) =>{
    const { id_piso} =  req.params;
    const piso = await Piso.findOne({where: {ID_PISO: id_piso}})
    if (!piso) {
        return res.status(404).json({
            msg: "El piso con id: " + id_piso + " no existe"
        })
    }
    try{
        await Piso.destroy({where: {ID_PISO: id_piso}}
        )
        return res.json({
            msg:'Piso con id ' + id_piso + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al borrar el piso con id: '+id_piso,
                error
            })
        }
};
export const getPiso = async(req: Request, res: Response) =>{
    const { id_piso} =  req.params;
    try{
        const piso = await Piso.findOne({where: {ID_PISO: id_piso}})
        if (!piso) {
            return res.status(404).json({
                msg: "El piso con id: " + id_piso + " no existe"
            })
        }
        res.json(piso)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el piso con id: '+id_piso,
                error
            })
        }
};

export const activarPiso = async(req:Request, res: Response) => {
    const {id_piso} = req.params;
    const {trigger} = req.body;
    const piso = await Piso.findOne({where: {ID_PISO:id_piso}});
    if(!piso){
        return res.status(404).json({
            msg: "El piso ingresado no existe"
        })
    }
    try{
        if(trigger == 1){
            await Piso.update({
                ESTADO_PISO: true
            },{where: {ID_PISO: id_piso}});
            return res.json({
                msg: "Se ha activado el piso con id: "+id_piso+" correctamente"
            })
        }else{
            await Piso.update({
                ESTADO_PISO: false
        },{where: {ID_PISO: id_piso}});
        return res.json({
            msg: "Se ha desactivado el piso con id: "+id_piso+" correctamente"
        })
    }
    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al cambiar el estado del piso con id: "+id_piso,
            error
        })

    }
}