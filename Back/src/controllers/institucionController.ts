import {Request, Response} from 'express';
import { Institucion } from '../models/institucionModel';

export const getInstituciones = async(req: Request, res: Response) =>{ 
    try {
        const instituciones = await Institucion.findAll();
        res.json(instituciones)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la lista de instituciones.' });
    }
};
export const newInstitucion = async(req: Request, res: Response) =>{
    const { nombre_institucion, tipo_institucion} =  req.body;
    try{
        await Institucion.create({
            "NOMBRE_INSTITUCION": nombre_institucion,
            "TIPO_INSTITUCION": tipo_institucion
        })
        return res.status(201).json({
            msg: 'Institucion creada correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear la institucion',
            error
        })
    }
};
export const updateInstitucion = async(req: Request, res: Response) => {
    const {id_institucion} = req.params;
    const {nombre_institucion, tipo_institucion} = req.body;
    const institucion = await Institucion.findOne({where: {ID_INSTITUCION: id_institucion}})
    if (!institucion) {
        return res.status(404).json({
            msg: "no existe una institucion con id: "+ id_institucion
        })
    }
    try{
        await Institucion.update({
            NOMBRE_INSTITUCION: nombre_institucion,
            TIPO_INSTITUCION: tipo_institucion
            },
            {where: {ID_INSTITUCION: id_institucion}}
        )
        return res.json({
            msg:'Institucion con id: ' + id_institucion + ' actualizada correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar la institucion con id: '+id_institucion,
                error
            })
        }
};
export const deleteInstitucion = async(req: Request, res: Response) =>{
    const { id_institucion} =  req.params;
    const institucion = await Institucion.findOne({where: {ID_INSTITUCION: id_institucion}})
    if (!institucion) {
        return res.status(404).json({
            msg: "La institucion con id: " + id_institucion + " no existe"
        })
    }
    try{
        await Institucion.destroy({where: {ID_INSTITUCION: id_institucion}}
        )
        return res.json({
            msg:'Institucion con id ' + id_institucion + ' borrada correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al borrar la institucion con id: '+id_institucion,
                error
            })
        }
};
export const getInstitucion = async(req: Request, res: Response) =>{
    const { id_institucion} =  req.params;
    try{
        const institucion = await Institucion.findOne({where: {ID_INSTITUCION: id_institucion}})
        if (!institucion) {
            return res.status(404).json({
                msg: "La institucion con id: " + id_institucion + " no existe"
            })
        }
        res.json(institucion)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar la institucion con id: '+id_institucion,
                error
            })
        }
};

export const activarInstitucion = async(req:Request, res: Response) => {
    const {id_institucion} = req.params;
    const {trigger} = req.body;
    const institucion = await Institucion.findOne({where: {ID_INSTITUCION:id_institucion}});
    if(!institucion){
        return res.status(404).json({
            msg: "La institucion ingresada no existe"
        })
    }
    try{
        if(trigger == 1){
            await Institucion.update({
                ESTADO_INSTITUCION: true
            },{where: {ID_INSTITUCION: id_institucion}});
            return res.json({
                msg: "Se ha activado la institucion con id: "+id_institucion+" correctamente"
            })
        }else{
            await Institucion.update({
                ESTADO_INSTITUCION: false
        },{where: {ID_INSTITUCION: id_institucion}});
        return res.json({
            msg: "Se ha desactivado la institucion con id: "+id_institucion+" correctamente"
        })
    }
    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al cambiar el estado de la institucion con id: "+id_institucion,
            error
        })

    }
}