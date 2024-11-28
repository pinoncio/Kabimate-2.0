import { Request, Response } from "express";
import { DetalleReservaHabitacionProducto } from "../models/detalleReservaHabitacionProductoModel";
import { ReservaHabitacion } from "../models/reservaHabitacionModel";

export const getDetalleReservaProductoHabitacion = async(req: Request, res: Response) =>{
    const { id_reserva } = req.params;

    const reserva = await ReservaHabitacion.findOne({where: {ID_RESERVA_HABITACION: id_reserva}});
    if(!reserva){
        return res.json({
            msg: "No existe una reserva de habitacion con el id "+id_reserva
        })
    }
    try{
        const detalleReservaHabitacionProducto = await DetalleReservaHabitacionProducto.findAll({where: {ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO: id_reserva}});
        res.json(detalleReservaHabitacionProducto)
    }catch(error){
        res.status(400).json({
            msg: "Ha ocurrido un error al obtener el detalle de los productos asociados a la reserva de habitacion "+id_reserva
        })
    }
}