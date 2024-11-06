import {Request, Response} from 'express';
import { Rol } from '../models/rolModel';

export const getRoles = async(req: Request, res: Response) =>{ 
    try {
        const roles = await Rol.findAll();
        res.json(roles)
    }catch (error) {
        res.status(500).json({ 
            msg: 'Error al obtener la lista de roles.',
        error
    });
    }
};
export const newRol = async(req: Request, res: Response) =>{
    const { nombre_rol} =  req.body;
    try{
        await Rol.create({
            "NOMBRE_ROL": nombre_rol
        })
        return res.status(201).json({
            msg: 'Rol creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear el rol',
            error
        })
    }
};
export const updateRol = async(req: Request, res: Response) => {
    const {id_rol} = req.params;
    const {nombre_rol} = req.body;
    const rol = await Rol.findOne({where: {ID_ROL: id_rol}})
    if (!rol) {
        return res.status(404).json({
            msg: "no existe un rol con id: " + id_rol
        })
    }
    try{
        await Rol.update({
            NOMBRE_ROL: nombre_rol
            },
            {where: {ID_ROL: id_rol}}
        )
        return res.json({
            msg:'Rol ' + id_rol + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el rol: '+id_rol,
                error
            })
        }
};
export const deleteRol = async(req: Request, res: Response) =>{
    const { id_rol} =  req.params;
    const rol = await Rol.findOne({where: {ID_ROL: id_rol}})
    if (!rol) {
        return res.status(404).json({
            msg: "El rol con id: " + id_rol + " no existe"
        })
    }
    try{
        await Rol.destroy({where: {ID_ROL: id_rol}}
        )
        return res.json({
            msg:'Rol con id ' + id_rol + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al borrar el rol con id: '+id_rol,
                error
            })
        }
};
export const getRol = async(req: Request, res: Response) =>{
    const { id_rol} =  req.params;
    try{
        const rol = await Rol.findOne({where: {ID_ROL: id_rol}})
        if (!rol) {
            return res.status(404).json({
                msg: "El rol con id: " + id_rol + " no existe"
            })
        }
        res.json(rol)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el rol con id: '+id_rol,
                error
            })
        }
};

export const activarRol = async(req:Request, res: Response) => {
    const {id_rol} = req.params;
    const {trigger} = req.body;
    const rol = await Rol.findOne({where: {ID_ROL:id_rol}});
    if(!rol){
        return res.status(404).json({
            msg: "El rol ingresado no existe"
        })
    }
    try{
        if(trigger == 1){
            await Rol.update({
                ESTADO_ROL: true
            },{where: {ID_ROL: id_rol}});
            return res.json({
                msg: "Se ha activado el rol con id: "+id_rol+" correctamente"
            })
        }else{
            await Rol.update({
                ESTADO_ROL: false
        },{where: {ID_ROL: id_rol}});
        return res.json({
            msg: "Se ha desactivado el rol con id: "+id_rol+" correctamente"
        })
    }
    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al cambiar el estado del rol con id: "+id_rol,
            error
        })

    }
}