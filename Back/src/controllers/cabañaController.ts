import { Request, Response } from "express";
import { Cabania } from "../models/cabañaModel";

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