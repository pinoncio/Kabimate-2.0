import { Request, Response } from "express";
import { EstadoPago } from "../models/estadoPagoModel";

export const getEstadosPago = async(req: Request, res: Response)=>{
    try {
        const estados = await EstadoPago.findAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ 
            msg: 'Error al obtener la lista de estados de reserva.',
        error
        });
    }
};
export const getEstadoPago = async(req: Request, res: Response)=>{
    const {id_estado} = req.params;
    try {
        const estado = await EstadoPago.findOne({where:{ ID_ESTADO_PAGO: id_estado}});
        res.json(estado);
    } catch (error) {
        res.status(500).json({ 
            msg: 'Error al obtener el estado de reserva.',
        error
    });
}
}