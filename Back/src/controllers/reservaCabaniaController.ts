import { Request, Response } from "express";
import { ReservaCabania } from "../models/reservaCabaniaModel";
import { Usuario } from "../models/usuarioModel";
import { Cabania } from "../models/cabañaModel";
import { Op } from "sequelize";

export const newReservaCabania = async(req: Request, res: Response) =>{
    const { id_usuario } = req.params;
    const { fecha_inicio,
            fecha_final,
            nombre1_huesped,
            nombre2_huesped,
            apellido1_huesped,
            apellido2_huesped,
            edad_huesped,
            rut_huesped,
            direccion_huesped,
            telefono_huesped,
            anticipo,
            id_cabania
    } = req.body;
    const usuario = await Usuario.findOne({where: {ID_USUARIO: id_usuario}});
    if(!usuario){
        return res.status(400).json({
            msg: "El usuario ingresado no existe"
        });
    };
    if(!fecha_inicio || !fecha_final || !nombre1_huesped || !nombre2_huesped || !apellido1_huesped || !apellido2_huesped || !edad_huesped || !rut_huesped || !direccion_huesped || !telefono_huesped || !id_cabania){
        return res.json({
            msg: "Todos los campos deben ser llenados"
        });
    };
    const cabania = await Cabania.findOne({where: {ID_CABANIA: id_cabania}});
    if (cabania?.dataValues.ID_ESTADO_CABANIA == 2){
        return res.json({
            msg: "No puede reservar la cabaña porque actualmente se encuentra ocupada"
        });
    };
    if (cabania?.dataValues.ID_ESTADO_CABANIA == 3){
        return res.json({
            msg: "No puede reservar la cabaña porque actualmente se encuentra en mantencion"
        });
    };

    const estaraOcupada = await ReservaCabania.findAll({
        where: {
            ID_CABANIA_RESERVA_CABANIA: id_cabania,
            [Op.or]: [
                {
                    FECHA_INICIO: {
                        [Op.between]: [fecha_inicio, fecha_final]
                    }
                },
                {
                    FECHA_FINAL: {
                        [Op.between]: [fecha_inicio, fecha_final]
                    }
                },
                {
                    [Op.and]: [
                        { FECHA_INICIO: { [Op.lte]: fecha_inicio } },
                        { FECHA_FINAL: { [Op.gte]: fecha_final } }
                    ]
                }
            ]
        }
    });

    if(estaraOcupada.length > 0){
        return res.json({
            msg: "La cabaña ya tiene reservas en ese rango de fechas"
        })
    }
    const fecha_inicio_convertida: Date = new Date(fecha_inicio);
    const fecha_final_convertida: Date = new Date(fecha_final);
    // Restar las marcas de tiempo en milisegundos
    const diferenciaEnMilisegundos: number = fecha_final_convertida.getTime() - fecha_inicio_convertida.getTime();

    // Convertir la diferencia de milisegundos a días
    const cantidad_dias_reserva: number = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    const nuevoTotal = (cabania?.dataValues.PRECIO_POR_NOCHE * cantidad_dias_reserva) -  anticipo
    try{
        await ReservaCabania.create({
            "FECHA_INICIO": fecha_inicio,
            "FECHA_FINAL": fecha_final,
            "NOMBRE1_HUESPED":  nombre1_huesped,
            "NOMBRE2_HUESPED": nombre2_huesped,
            "APELLIDO1_HUESPED": apellido1_huesped,
            "APELLIDO2_HUESPED": apellido2_huesped,
            "EDAD_HUESPED": edad_huesped,
            "RUT_HUESPED": rut_huesped,
            "DIRECCION_HUESPED": direccion_huesped,
            "TELEFONO_HUESPED": telefono_huesped,
            "ANTICIPO": anticipo,
            "TOTAL": nuevoTotal,
            "ID_CABANIA_RESERVA_CABANIA": id_cabania, 
            "ID_USUARIO_RESERVA_CABANIA": id_usuario
        });

        const hoy = new Date();
        if (new Date(fecha_inicio).toDateString() === hoy.toDateString()) {
            await Cabania.update({
                ID_ESTADO_CABANIA: 2
    
            },{where:{ ID_CABANIA: id_cabania}});
        }

        return res.status(201).json({
            msg: 'La reserva de la cabaña '+id_cabania+" ha sido exitosa"       
        })

    }catch(error){
        res.status(400).json({
            msg: "Ha ocurrido un error al crear la reserva de la cabaña con id: "+id_cabania,
            error
        });
    };
};

export const getReservaCabania = async(req: Request, res: Response) =>{
    const {id_reserva} = req.params;
    try{
        const reserva = await ReservaCabania.findOne({where: {ID_RESERVA_CABANIA: id_reserva}});
        if (!reserva){
            return res.status(404).json({
                msg: "No existe un reserva con el id: "+id_reserva
            });
        };
        res.json(reserva);
        }catch(error){
            res.status(400).json({
                msg: "Ha ocurrido un error al obtener la reserva de cabaña con id: "+id_reserva,
                error
            });
        };
};

export const getReservasCabania = async(req: Request, res: Response)=>{
    const {id_usuario} = req.params;
    const usuario = await Usuario.findOne({where: {ID_USUARIO: id_usuario}});
    if(!usuario){
        return res.status(404).json({
            msg: "El usuario ingresado no existe"
        });
    };
    try{
        const reservas = await ReservaCabania.findAll({where: {ID_USUARIO_RESERVA_CABANIA: id_usuario}});
        res.json(reservas);
    }catch(error){
        res.status(500).json({
            msg: "Ha ocurrido un error al obtener las reservas de cabañas del usuario: :"+ id_usuario,
            error
        });

    };

};


export const deleteReserva = async(req: Request, res: Response)=> {
    const {id_reserva} = req.params;
    const reserva = await ReservaCabania.findOne({where: {ID_RESERVA: id_reserva}});
    if(!reserva){
        return res.status(404).json({
            msg: "La reserva ingresada no existe"
        });
        }
    try{
        await ReservaCabania.destroy({where:{ID_RESERVA: id_reserva}});
        return res.json({
            msg: "Se ha eliminado la reserva "+id_reserva
        })

    }catch(error){
        res.status(500).json({
            msg: "Ha ocurrido un error al eliminar la reserva de cabañas: "+ id_reserva,
            error
        });

    };

};

export const verificarEstadosCabania = async () => {
    try {
        const fechaHoy = new Date();
        const reservasHoy = await ReservaCabania.findAll({
            where: {
                FECHA_INICIO: fechaHoy.toISOString().split('T')[0],
            },
        });

        for (const reserva of reservasHoy) {
            const cabaña = await Cabania.findOne({where: {ID_CABANIA: reserva?.dataValues.ID_CABANIA_RESERVA_CABANIA}});
            if(cabaña?.dataValues.ID_ESTADO_CABANIA == 1){
                await Cabania.update(
                    { ID_ESTADO_CABANIA: 2 },
                    { where: { ID_CABANIA: reserva?.dataValues.ID_CABANIA_RESERVA_CABANIA } }
                );
                console.log(`Cabaña ${reserva?.dataValues.ID_CABANIA_RESERVA_CABANIA} actualizada a 'Ocupada'`);
            }
        }
    } catch (error) {
        console.error("Error verificando estados de cabañas:",error);
    }
};
