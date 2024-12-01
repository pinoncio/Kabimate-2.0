import { Request, Response } from "express";
import { ReservaCabania } from "../models/reservaCabaniaModel";
import { Usuario } from "../models/usuarioModel";
import { Cabania } from "../models/cabañaModel";
import { Op } from "sequelize";
import { Producto } from "../models/productoModel";
import sequelize from "../db/dbConnection";
import { DetalleReservaCabaniaProducto } from "../models/detalleReservaCabaniaProductoModel";

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
        where: {ID_ESTADO_PAGO_RESERVA_CABANIA: 1,
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
            "ID_USUARIO_RESERVA_CABANIA": id_usuario,
            "ID_ESTADO_PAGO_RESERVA_CABANIA": 1
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


export const deleteReservaCabania = async(req: Request, res: Response)=> {
    const {id_reserva} = req.params;
    const reserva = await ReservaCabania.findOne({where: {ID_RESERVA_CABANIA: id_reserva}});
    if(!reserva){
        return res.status(404).json({
            msg: "La reserva ingresada no existe"
        });
        }
    try{
        await ReservaCabania.destroy({where:{ID_RESERVA_CABANIA: id_reserva}});
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
export const updateReservaCabania = async(req: Request, res: Response)=>{
    const {id_reserva} = req.params;
    const {
        fecha_inicio,
        fecha_final,
        nombre1_huesped,
        nombre2_huesped,
        apellido1_huesped,
        apellido2_huesped,
        edad_huesped,
        rut_huesped,
        direccion_huesped,
        telefono_huesped,
        anticipo} = req.body;
    const reserva = await ReservaCabania.findOne({where: {ID_RESERVA_CABANIA: id_reserva}});
    if (!reserva){
        return res.status(404).json({
            msg: "No existe un reserva con el id: "+id_reserva
        });
    };
    try{
        const rutHuesped: number = reserva?.dataValues.RUT_HUESPED
        
        const estaraOcupadaInicio = await ReservaCabania.findAll({
            where: {ID_ESTADO_PAGO_RESERVA_CABANIA: 1,
                ID_CABANIA_RESERVA_CABANIA:reserva?.dataValues.ID_CABANIA_RESERVA_CABANIA,RUT_HUESPED: {[Op.ne]: rutHuesped},
                [Op.or]: [
                    {
                        FECHA_INICIO: {
                            [Op.between]: [fecha_inicio, fecha_final]
                        }
                    },
                    {
                        [Op.and]: [
                            { FECHA_INICIO: { [Op.lte]: fecha_inicio } },
                            { FECHA_FINAL: { [Op.gte]: fecha_inicio } }
                        ]
                    }
                ]
            }
        });
        
        const estaraOcupadaFinal = await ReservaCabania.findAll({
            where: {ID_ESTADO_PAGO_RESERVA_CABANIA: 1,
                ID_CABANIA_RESERVA_CABANIA: reserva?.dataValues.ID_CABANIA_RESERVA_CABANIA,RUT_HUESPED: {[Op.ne]: rutHuesped},
                [Op.or]: [
                    {
                        FECHA_FINAL: {
                            [Op.between]: [fecha_inicio, fecha_final]
                        }
                    },
                    {
                        [Op.and]: [
                            { FECHA_INICIO: { [Op.lte]: fecha_final } },
                            { FECHA_FINAL: { [Op.gte]: fecha_final } }
                        ]
                    }
                ]
            }
        });
        if (estaraOcupadaInicio.length > 0 && estaraOcupadaFinal.length > 0) {
            return res.json({
                msg: "Debe cambiar la fecha de inicio y final de la reserva, ya que ambas coinciden con reservas de la cabaña "+reserva?.dataValues.ID_CABANIA_RESERVA_CABANIA
            });
        }
        
        if (estaraOcupadaInicio.length > 0) {
            return res.json({
                msg: "La cabaña "+reserva?.dataValues.ID_CABANIA_RESERVA_CABANIA+" ya está ocupada en la fecha de inicio seleccionada"
            });
        }
        
        if (estaraOcupadaFinal.length > 0) {
            return res.json({
                msg: "La cabaña "+reserva?.dataValues.ID_CABANIA_RESERVA_CABANIA+ " ya está ocupada en la fecha de finalización seleccionada"
            });
        }

        const cabania = await Cabania.findOne({where: {ID_CABANIA: reserva?.dataValues.ID_CABANIA_RESERVA_CABANIA}});
        var fecha_inicio_convertida: Date = new Date(reserva?.dataValues.FECHA_INICIO);
        var fecha_final_convertida: Date = new Date(reserva?.dataValues.FECHA_FINAL);

        if(fecha_inicio){
            var fecha_inicio_convertida: Date = new Date(fecha_inicio);
        }
        if(fecha_final){
            var fecha_final_convertida: Date = new Date(fecha_final);
        };
        // Restar las marcas de tiempo en milisegundos
        const diferenciaEnMilisegundos: number = fecha_final_convertida.getTime() - fecha_inicio_convertida.getTime();
    
        // Convertir la diferencia de milisegundos a días
        const cantidad_dias_reserva: number = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
        var nuevoanticipo = reserva?.dataValues.ANTICIPO
        var nuevoTotal = reserva?.dataValues.TOTAL * 1
        if(anticipo){
            var nuevoanticipo = reserva?.dataValues.ANTICIPO + anticipo
            var nuevoTotal = (cabania?.dataValues.PRECIO_POR_NOCHE * cantidad_dias_reserva) -  nuevoanticipo
        }
        await ReservaCabania.update({
            "FECHA_INICIO": fecha_inicio_convertida,
            "FECHA_FINAL": fecha_final_convertida,
            "NOMBRE1_HUESPED":  nombre1_huesped,
            "NOMBRE2_HUESPED": nombre2_huesped,
            "APELLIDO1_HUESPED": apellido1_huesped,
            "APELLIDO2_HUESPED": apellido2_huesped,
            "EDAD_HUESPED": edad_huesped,
            "RUT_HUESPED": rut_huesped,
            "DIRECCION_HUESPED": direccion_huesped,
            "TELEFONO_HUESPED": telefono_huesped,
            "ANTICIPO": nuevoanticipo,
            "TOTAL": nuevoTotal

        },{where:{ID_RESERVA_CABANIA: id_reserva}});
        const updatedReserva = await ReservaCabania.findOne({where:{ID_RESERVA_CABANIA: id_reserva}});
        const nuevaFechaInicio = new Date(updatedReserva?.dataValues.FECHA_INICIO);
        const hoy = new Date();

        if (new Date(updatedReserva?.dataValues.FECHA_INICIO).toDateString() === hoy.toDateString()) {
            await Cabania.update({
                ID_ESTADO_CABANIA: 2
    
            },{where:{ ID_CABANIA: cabania?.dataValues.ID_CABANIA}});
        }
        if (nuevaFechaInicio < hoy) {
            await Cabania.update({
                ID_ESTADO_CABANIA: 2
    
            },{where:{ ID_CABANIA: cabania?.dataValues.ID_CABANIA}});
        }
        if (nuevaFechaInicio > hoy) {
            console.log(cabania?.dataValues.ID_CABANIA)
            await Cabania.update({
                ID_ESTADO_CABANIA: 1
    
            },{where:{ ID_CABANIA: cabania?.dataValues.ID_CABANIA}});
        }
        res.json({
            msg: "Se ha actualizado la reserva correctamente"
        });
    }catch(error){
        res.status(500).json({
            msg: "Ha ocurrido un error al actualizar la reserva de cabaña: "+id_reserva,
            error
        }); 
    }
};

export const agregarProductoReservaCabania = async(req: Request, res: Response) =>{
    const {id_reserva} = req.params;
    const {id_producto, cantidad}= req.body;
    const t = await sequelize.transaction(); //para el rollback

    const reserva = await ReservaCabania.findOne({where: {ID_RESERVA_CABANIA: id_reserva}});
    if (!reserva){
        return res.status(404).json({
            msg: "No existe un reserva con el id: "+id_reserva
        });
    };
    const producto = await Producto.findOne({where: {ID_PRODUCTO: id_producto}});
    if (!producto){
        return res.status(404).json({
            msg: "No existe un producto con el id: "+id_producto
        });
    };
    try{
        const totalProductos = producto?.dataValues.PRECIO_PRODUCTO * cantidad

        await DetalleReservaCabaniaProducto.create({
            "CANTIDAD": cantidad,
            "TOTAL": totalProductos,
            "ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO": id_producto,
            "ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO": id_reserva
        });

        await ReservaCabania.update({
            "TOTAL": totalProductos + reserva?.dataValues.TOTAL
        },{where:{ID_RESERVA_CABANIA: id_reserva}});
        
        await t.commit(); // si no hay errores en la transaccion commiteamos
        res.json({
            msg: "Se ha agregado correctamente el producto "+id_producto+" a la reserva "+id_reserva
        })
    }catch(error){
        await t.rollback(); // si hay errores rollback
        res.status(500).json({
            msg: "Ha ocurrido un error al añadir el producto con id: "+id_producto+" a la reserva "+id_reserva,
            error
        });
    }
};

export const updateProductoReservaCabania = async(req: Request, res: Response) =>{
    const {id_reserva} = req.params;
    const {id_producto, cantidad}= req.body;
    const t = await sequelize.transaction(); //para el rollback

    const reserva = await ReservaCabania.findOne({where: {ID_RESERVA_CABANIA: id_reserva}});
    if (!reserva){
        return res.status(404).json({
            msg: "No existe un reserva con el id: "+id_reserva
        });
    };
    const producto = await Producto.findOne({where: {ID_PRODUCTO: id_producto}});
    if (!producto){
        return res.status(404).json({
            msg: "No existe un producto con el id: "+id_producto
        });
    };
    const detalleReservaProducto = await DetalleReservaCabaniaProducto.findOne({where:{ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO: id_producto, ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO: id_reserva}});
    if (!detalleReservaProducto){
        return res.status(404).json({
            msg: "Aun no se agregado ningun producto con id: "+id_producto+' a la reserva con id '+id_reserva
        });
    };
    try{
        if(cantidad == 0){
            const totalReservaborrar = reserva?.dataValues.TOTAL
            const totalProductosBorrar = detalleReservaProducto?.dataValues.TOTAL
    
            await ReservaCabania.update({
                "TOTAL": totalReservaborrar - totalProductosBorrar
            },{where:{ID_RESERVA_CABANIA: id_reserva}});
            await DetalleReservaCabaniaProducto.destroy({where: {ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO: id_producto, ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO: id_reserva}});
            await t.commit();
            return res.json({
                msg: "Se han quitado todos los productos con id "+id_producto+" de la reserva "+id_reserva
            })
        }
        const totaldReservaActual = reserva?.dataValues.TOTAL
        const totalProductosActual = detalleReservaProducto?.dataValues.TOTAL

        await ReservaCabania.update({
            "TOTAL": totaldReservaActual - totalProductosActual
        },{where:{ID_RESERVA_CABANIA: id_reserva}});
        

        await DetalleReservaCabaniaProducto.update({
            "CANTIDAD": cantidad,
            "TOTAL":  + producto?.dataValues.PRECIO_PRODUCTO * cantidad
        },{where: {ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO: id_producto, ID_RESERVA_CABANIA_DETALLE_RESERVA_CABANIA_PRODUCTO: id_reserva}});

        
        const reservaActual =  await ReservaCabania.findOne({where: {ID_RESERVA_CABANIA: id_reserva}});

        await ReservaCabania.update({
            "TOTAL": reservaActual?.dataValues.TOTAL + producto?.dataValues.PRECIO_PRODUCTO * cantidad
        },{where:{ID_RESERVA_CABANIA: id_reserva}});
        
        await t.commit(); // si no hay errores en la transaccion commiteamos
        res.json({
            msg: "Se ha actualizado correctamente el numero de productos con id "+id_producto+" a la reserva "+id_reserva
        })
    }catch(error){
        await t.rollback(); // si hay errores rollback
        res.status(500).json({
            msg: "Ha ocurrido un error al actualizar el numero de productos con id: "+id_producto+" a la reserva "+id_reserva,
            error
        });
    }
};

export const verificarEstadosCabania = async () => {
    try {
        const fechaHoy = new Date();
        const reservasHoy = await ReservaCabania.findAll({
            where: {
                FECHA_INICIO: fechaHoy.toISOString().split('T')[0],
                ID_ESTADO_PAGO_RESERVA_CABANIA: 1
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

export const finalizarReservaCabania = async (req: Request, res: Response) => {
    const { id_reserva } = req.params;
    const { trigger } = req.body;
    const reserva = await ReservaCabania.findOne({ where: { ID_RESERVA_CABANIA: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "No existe una reserva con el id: " + id_reserva
        });
    };

    try {
        if (trigger == 1) {
            
            await ReservaCabania.update({
                "ID_ESTADO_PAGO_RESERVA_CABANIA": 3
    
            }, { where: { ID_RESERVA_CABANIA: id_reserva } });

            await Cabania.update({
                "ID_ESTADO_CABANIA": 1

            },{where:{ID_CABANIA: reserva?.dataValues.ID_CABANIA_RESERVA_CABANIA}});
            return res.json({
                msg: "La reserva de cabaña "+id_reserva+" ha sido finalizada correctamente"
            })
    
        }
        if (trigger == 0) {
            
            await ReservaCabania.update({
                "ID_ESTADO_PAGO_RESERVA_CABANIA": 2
    
            }, { where: { ID_RESERVA_CABANIA: id_reserva } });
            await Cabania.update({
                "ID_ESTADO_CABANIA": 1

            },{where:{ID_CABANIA: reserva?.dataValues.ID_CABANIA_RESERVA_CABANIA}});
            return res.json({
                msg: "La reserva de cabaña "+id_reserva+" ha sido cancelada correctamente"
            })
    
        }
    } catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al finalizar la reserva de cabaña",
            error
        });
    }
        
    }


