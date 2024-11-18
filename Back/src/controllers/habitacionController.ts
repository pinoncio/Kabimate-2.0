import { Request, Response } from "express";
import { Habitacion } from "../models/habitacionModel";
import { Usuario } from "../models/usuarioModel";

export const newHabitacion = async(req: Request, res: Response) => {
    const {id_usuario} = req.params;
    const { numero_habitacion,
            capacidad,
            precio_por_noche,
            servicios_incluidos,
            descripcion_habitacion,
            id_tipo_habitacion,
            id_piso} = req.body;
    
    const usuario = await Usuario.findOne({where: {ID_USUARIO:id_usuario}});
    if(!usuario){
        return res.status(404).json({
            msg: 'El usuario: '+id_usuario+ ' no existe'
        })
    }
    
    try{
        await Habitacion.create({
            "NUMERO_HABITACION": numero_habitacion,
            "CAPACIDAD": capacidad,
            "PRECIO_POR_NOCHE": precio_por_noche,
            "SERVICIOS_INCLUIDOS": servicios_incluidos,
            "DESCRIPCION_HABITACION": descripcion_habitacion,
            "ESTADO_HABITACION": true,
            "ID_TIPO_HABITACION_HABITACION": id_tipo_habitacion,
            "ID_PISO_HABITACION": id_piso,
            "ID_ESTADO_HABITACION": 1,
            "ID_USUARIO_HABITACION": id_usuario
        });
        return res.status(201).json({
            msg: 'Habitacion creada correctamente'
        });

    }catch(error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al crear la habitacion',
            error
        })
    }

};

export const getHabitacion = async(req: Request, res: Response)=> {
    const {id_habitacion} = req.params;
    try{
        const habitacion = await Habitacion.findOne({where:{ID_HABITACION:id_habitacion}});
        if (!habitacion){
            return res.status(400).json({
                msg: 'La habitacion con id: '+id_habitacion+' no existe'
            });
        };
        res.json(habitacion);
    }catch(error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener la habitacion con id: '+id_habitacion,
            error
        });
    };
};

export const getHabitaciones = async(req: Request, res: Response)=> {
    const {id_usuario} = req.params;
    const usuario = await Usuario.findOne({where:{ID_USUARIO: id_usuario}});
    if (!usuario){
        return res.status(400).json({
            msg: 'El usuario ingresado no existe',
        })
    }
    try{
        const habitaciones = await Habitacion.findAll({where:{ID_USUARIO_HABITACION:id_usuario}});
        res.json(habitaciones);
    }catch(error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener las cabañas del usuario con id: '+id_usuario,
            error
        });
    };
};

export const activarHabitacion = async(req: Request, res: Response)=> {
    const {id_habitacion} = req.params;
    const {trigger} = req.body;
    const habitacion = await Habitacion.findOne({where: {ID_HABIITACION:id_habitacion}});
    if (!habitacion){
        return res.status(404).json({
            msg: 'La habitacion con id: '+id_habitacion+' no existe'
        });
    };
    if(habitacion.dataValues.ID_ESTADO_HABITACION == 2){
        return res.status(404).json({
            msg: 'La habitacion se encuentra ocupada, porfavor pruebe mas tarde'
        });
    };
    try{
        if(trigger == 1){
            await Habitacion.update({
                ESTADO_HABITACION: true
            },{where: {ID_HABITACION: id_habitacion}});
            return res.json({
                msg: 'Se ha activado la habitacion con id: '+id_habitacion+' correctamente'
            });
        }else{
            await Habitacion.update({
                ESTADO_HABITACION: false
                },{where: {ID_HABITACION: id_habitacion}});
            return res.json({
            msg: 'Se ha desactivado la habitacion con id: '+id_habitacion+' correctamente'
            });
        }
    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al activar/desactivar la habitacion con id: "+id_habitacion,
            error
        })
    }
};

export const updateHabitacion = async(req: Request, res: Response)=> {
    const {id_habitacion} = req.params;
    const {
        numero_habitacion,
        capacidad,
        precio_por_noche,
        servicios_incluidos,
        descripcion_habitacion,
        id_tipo_habitacion,
        id_piso,
        id_estado    
    } = req.body;

    const habitacion = await Habitacion.findOne({where:{ID_HABITACION: id_habitacion}});
    if(!habitacion){
        return res.json({
            msg: 'No existe un habitacion con id: '+id_habitacion
        });
    };
    if(habitacion.dataValues.ID_ESTADO_HABITACION == 2){
        return res.status(404).json({
            msg: 'La habitacion se encuentra ocupada, porfavor pruebe mas tarde'
        });
    };
    if(habitacion.dataValues.ESTADO_HABITACION == false){
        return res.status(404).json({
            msg: 'La habitacion se encuentra desactivada, porfavor vuelva a activarla antes de proceder'
        });
    };
    try{
        await Habitacion.update({
            NUMERO_HABITACION: numero_habitacion,
            CAPACIDAD: capacidad,
            PRECIO_POR_NOCHE: precio_por_noche,
            SERVICIOS_INCLUIDOS: servicios_incluidos,
            DESCRIPCION_HABITACION: descripcion_habitacion,
            ID_TIPO_HABITACION_HABITACION: id_tipo_habitacion,
            ID_PISO_HABITACION: id_piso,
            ID_ESTADO_HABITACION: id_estado

        },{where: {ID_HABITACION:id_habitacion}});
        return res.json({
            msg: 'Se ha actualizado la informacion de la habitacion con id: '+id_habitacion+' correctamente'
        });

    }catch(error){
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actulizar la informacion de la habitacion '+ id_habitacion,
            error
        });
    };

};


