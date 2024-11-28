import { Request, Response } from "express";
import { DetalleReservaCabaniaProducto } from "../models/detalleReservaCabaniaProductoModel";
import { ReservaCabania } from "../models/reservaCabaniaModel";

export const getDetalleReservaProductoCabania = async(req: Request, res: Response) =>{
    const { id_reserva } = req.params;

    const reserva = await ReservaCabania.findOne({where: {ID_RESERVA_CABANIA: id_reserva}});
    if(!reserva){
        return res.json({
            msg: "No existe una reserva con el id "+id_reserva
        })
    }
    try{
        const detalleReservaCabaniaProducto = await DetalleReservaCabaniaProducto.findAll({where: {ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO: id_reserva}});
        res.json(detalleReservaCabaniaProducto)
    }catch(error){
        res.status(400).json({
            msg: "Ha ocurrido un error al obtener el detalle de los productos asociados a la reserva "+id_reserva
        })
    }
}