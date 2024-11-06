import { Request, Response } from "express";
import { Cabania } from "../models/cabañaModel";
import { Usuario } from "../models/usuarioModel";

export const newCabaña = async(req:Request, res: Response) => {
    const {id_usuario} = req.params;
    const {capacidad, cantidad_piezas, precio_por_noche,ubicacion, servicios_incluidos,descripcion_cabania, id_estado_cabania} = req.body;

    try {
        await Cabania.create({
            "CAPACIDAD": capacidad,
            "CANTIDAD_PIEZAS": cantidad_piezas,
            "PRECIO_POR_NOCHE": precio_por_noche,
            "UBICACION": ubicacion,
            "SERVICIOS_INCLUIDOS": servicios_incluidos,
            "DESCRIPCION_CABANIA": descripcion_cabania,
            "ESTADO_CABANIA": true,
            "ID_ESTADO_CABANIA": id_estado_cabania,
            "ID_USUARIO_CABANIA": id_usuario
        })
        return res.status(201).json({
            msg: 'La cabaña se ha creado correctamente'
        })
    }catch (error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al crear la cabaña',
            error
        })

    }
};

export const getCabaña = async(req: Request, res: Response) =>{
    const {id_usuario} = req.params;
    const {id_cabaña} = req.body;

    try{
        const usuario = Usuario.findOne({where:{ID_USUARIO: id_usuario}});
        const cabaña = Cabania.findOne({where:{ID_CABANIA: id_cabaña}});
    
        if (!usuario){
            return res.status(400).json({
                msg: 'El usuario no existe',
            })
        }
    
        if (!cabaña){
            return res.status(400).json({
                msg: 'La cabaña con id: '+id_cabaña+' no existe',
            })
        }

        res.json(cabaña)
    }catch(error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener la cabaña con id: '+id_cabaña,
            error
        })

    }
}

export const getCabañas = async(req: Request, res: Response) =>{
    const {id_usuario} = req.params;

    try{
        const usuario = Usuario.findOne({where:{ID_USUARIO: id_usuario}});

        if (!usuario){
            return res.status(400).json({
                msg: 'El usuario no existe',
            })
        }

        const cabañas = Cabania.findAll({where:{ID_USUARIO_CABANIA: id_usuario}});
        res.json(cabañas);
    }catch(error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener las cabañas del usuario: '+id_usuario,
            error
        })
    }
}

export const activarCabaña = async(req: Request, res: Response) =>{
    const {id_cabaña, trigger} = req.body;
    try{
        const cabaña = await Cabania.findOne({where: {ID_CABANIA:id_cabaña}});
        if(!cabaña){
            return res.status(404).json({
                msg: "La cabaña con id: "+id_cabaña+' no existe'
            })
        }
        if(trigger == 1){
            await Cabania.update({
                ESTADO_CABANIA: true
            },{where: {ID_CABANIA: id_cabaña}});
            return res.json({
                msg: "Se ha activado la cabaña con id: "+id_cabaña+" correctamente"
            })
        }else{
            await Cabania.update({
                ESTADO_CABANIA: false
        },{where: {ID_CABANIA: id_cabaña}});
        return res.json({
            msg: "Se ha desactivado la cabaña con id: "+id_cabaña+" correctamente"
        })
    }
    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al activar/desactivar la cabaña con id: "+id_cabaña,
            error
        })

    }
}

