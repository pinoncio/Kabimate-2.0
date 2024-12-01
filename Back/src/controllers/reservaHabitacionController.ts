import { Request, Response } from "express";
import { Usuario } from "../models/usuarioModel";
import { Op } from "sequelize";
import sequelize from "../db/dbConnection";
import { Habitacion } from "../models/habitacionModel";
import { ReservaHabitacion } from "../models/reservaHabitacionModel";
import { Producto } from "../models/productoModel";
import { DetalleReservaHabitacionProducto } from "../models/detalleReservaHabitacionProductoModel";

export const newReservaHabitacion = async (req: Request, res: Response) => {
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
        id_habitacion
    } = req.body;
    const usuario = await Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(400).json({
            msg: "El usuario ingresado no existe"
        });
    };
    if (!fecha_inicio || !fecha_final || !nombre1_huesped || !nombre2_huesped || !apellido1_huesped || !apellido2_huesped || !edad_huesped || !rut_huesped || !direccion_huesped || !telefono_huesped || !id_habitacion) {
        return res.json({
            msg: "Todos los campos deben ser llenados"
        });
    };
    const habitacion = await Habitacion.findOne({ where: { ID_HABITACION: id_habitacion } });
    if (habitacion?.dataValues.ID_ESTADO_HABITACION == 2) {
        return res.json({
            msg: "No puede reservar la habitacion porque actualmente se encuentra ocupada"
        });
    };
    if (habitacion?.dataValues.ID_ESTADO_HABITACION == 3) {
        return res.json({
            msg: "No puede reservar la habitacion porque actualmente se encuentra en mantencion"
        });
    };

    const estaraOcupada = await ReservaHabitacion.findAll({
        where: {
            ID_ESTADO_PAGO_RESERVA_HABITACION: 1,
            ID_HABITACION_RESERVA_HABITACION: id_habitacion,
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

    if (estaraOcupada.length > 0) {
        return res.json({
            msg: "La habitacion ya tiene reservas en ese rango de fechas"
        })
    }
    const fecha_inicio_convertida: Date = new Date(fecha_inicio);
    const fecha_final_convertida: Date = new Date(fecha_final);
    // Restar las marcas de tiempo en milisegundos
    const diferenciaEnMilisegundos: number = fecha_final_convertida.getTime() - fecha_inicio_convertida.getTime();

    // Convertir la diferencia de milisegundos a días
    const cantidad_dias_reserva: number = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    const nuevoTotal = (habitacion?.dataValues.PRECIO_POR_NOCHE * cantidad_dias_reserva) - anticipo
    try {
        await ReservaHabitacion.create({
            "FECHA_INICIO": fecha_inicio,
            "FECHA_FINAL": fecha_final,
            "NOMBRE1_HUESPED": nombre1_huesped,
            "NOMBRE2_HUESPED": nombre2_huesped,
            "APELLIDO1_HUESPED": apellido1_huesped,
            "APELLIDO2_HUESPED": apellido2_huesped,
            "EDAD_HUESPED": edad_huesped,
            "RUT_HUESPED": rut_huesped,
            "DIRECCION_HUESPED": direccion_huesped,
            "TELEFONO_HUESPED": telefono_huesped,
            "ANTICIPO": anticipo,
            "TOTAL": nuevoTotal,
            "ID_HABITACION_RESERVA_HABITACION": id_habitacion,
            "ID_USUARIO_RESERVA_HABITACION": id_usuario,
            "ID_ESTADO_PAGO_RESERVA_HABITACION": 1
        });

        const hoy = new Date();
        if (new Date(fecha_inicio).toDateString() === hoy.toDateString()) {
            await Habitacion.update({
                ID_ESTADO_HABITACION: 2

            }, { where: { ID_HABITACION: id_habitacion } });
        }

        return res.status(201).json({
            msg: 'La reserva de la habitacion ' + id_habitacion + " ha sido exitosa"
        })

    } catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error al crear la reserva de la habitacion con id: " + id_habitacion,
            error
        });
    };
};

export const getReservaHabitacion = async (req: Request, res: Response) => {
    const { id_reserva } = req.params;
    try {
        const reserva = await ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
        if (!reserva) {
            return res.status(404).json({
                msg: "No existe un reserva con el id: " + id_reserva
            });
        };
        res.json(reserva);
    } catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error al obtener la reserva de habitacion con id: " + id_reserva,
            error
        });
    };
};

export const getReservasHabitacion = async (req: Request, res: Response) => {
    const { id_usuario } = req.params;
    const usuario = await Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(404).json({
            msg: "El usuario ingresado no existe"
        });
    };
    try {
        const reservas = await ReservaHabitacion.findAll({ where: { ID_USUARIO_RESERVA_HABITACION: id_usuario } });
        res.json(reservas);
    } catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al obtener las reservas de habitacion del usuario: :" + id_usuario,
            error
        });

    };

};

export const deleteReservaHabitacion = async (req: Request, res: Response) => {
    const { id_reserva } = req.params;
    const reserva = await ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "La reserva de habitacion ingresada no existe"
        });
    }
    try {
        await ReservaHabitacion.destroy({ where: { ID_RESERVA_HABITACION: id_reserva } });
        return res.json({
            msg: "Se ha eliminado la reserva de habitacion " + id_reserva
        })

    } catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al eliminar la reserva de habitacion: " + id_reserva,
            error
        });

    };

};

export const updateReservaHabitacion = async (req: Request, res: Response) => {
    const { id_reserva } = req.params;
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
        anticipo
    } = req.body;
    const reserva = await ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "No existe un reserva de habitacion con el id: " + id_reserva
        });
    }
    try {
        const rutHuesped: number = reserva?.dataValues.RUT_HUESPED;

        const estaraOcupadaInicio = await ReservaHabitacion.findAll({
            where: {
                ID_ESTADO_PAGO_RESERVA_HABITACION: 1,
                ID_HABITACION_RESERVA_HABITACION: reserva?.dataValues.ID_HABITACION_RESERVA_HABITACION,
                RUT_HUESPED: { [Op.ne]: rutHuesped },
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

        const estaraOcupadaFinal = await ReservaHabitacion.findAll({
            where: {
                ID_ESTADO_PAGO_RESERVA_HABITACION: 1,
                ID_HABITACION_RESERVA_HABITACION: reserva?.dataValues.ID_HABITACION_RESERVA_HABITACION,
                RUT_HUESPED: { [Op.ne]: rutHuesped },
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
                msg: "Debe cambiar la fecha de inicio y final de la reserva, ya que ambas coinciden con reservas de la habitación " + reserva?.dataValues.ID_HABITACION_RESERVA_HABITACION
            });
        }

        if (estaraOcupadaInicio.length > 0) {
            return res.json({
                msg: "La habitación " + reserva?.dataValues.ID_HABITACION_RESERVA_HABITACION + " ya está ocupada en la fecha de inicio seleccionada"
            });
        }

        if (estaraOcupadaFinal.length > 0) {
            return res.json({
                msg: "La habitación " + reserva?.dataValues.ID_HABITACION_RESERVA_HABITACION + " ya está ocupada en la fecha de finalización seleccionada"
            });
        }

        const habitacion = await Habitacion.findOne({ where: { ID_HABITACION: reserva?.dataValues.ID_HABITACION_RESERVA_HABITACION } });
        var fecha_inicio_convertida: Date = new Date(reserva?.dataValues.FECHA_INICIO);
        var fecha_final_convertida: Date = new Date(reserva?.dataValues.FECHA_FINAL);

        if (fecha_inicio) {
            var fecha_inicio_convertida: Date = new Date(fecha_inicio);
        }
        if (fecha_final) {
            var fecha_final_convertida: Date = new Date(fecha_final);
        }
        // Restar las marcas de tiempo en milisegundos
        const diferenciaEnMilisegundos: number = fecha_final_convertida.getTime() - fecha_inicio_convertida.getTime();

        // Convertir la diferencia de milisegundos a días
        const cantidad_dias_reserva: number = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
        var nuevoanticipo = reserva?.dataValues.ANTICIPO;
        var nuevoTotal = reserva?.dataValues.TOTAL * 1;
        if (anticipo) {
            var nuevoanticipo = reserva?.dataValues.ANTICIPO + anticipo;
            var nuevoTotal = (habitacion?.dataValues.PRECIO_POR_NOCHE * cantidad_dias_reserva) - nuevoanticipo;
        }
        await ReservaHabitacion.update({
            "FECHA_INICIO": fecha_inicio_convertida,
            "FECHA_FINAL": fecha_final_convertida,
            "NOMBRE1_HUESPED": nombre1_huesped,
            "NOMBRE2_HUESPED": nombre2_huesped,
            "APELLIDO1_HUESPED": apellido1_huesped,
            "APELLIDO2_HUESPED": apellido2_huesped,
            "EDAD_HUESPED": edad_huesped,
            "RUT_HUESPED": rut_huesped,
            "DIRECCION_HUESPED": direccion_huesped,
            "TELEFONO_HUESPED": telefono_huesped,
            "ANTICIPO": nuevoanticipo,
            "TOTAL": nuevoTotal

        }, { where: { ID_RESERVA_HABITACION: id_reserva } });
        const updatedReserva = await ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
        const nuevaFechaInicio = new Date(updatedReserva?.dataValues.FECHA_INICIO);
        const hoy = new Date();

        if (new Date(updatedReserva?.dataValues.FECHA_INICIO).toDateString() === hoy.toDateString()) {
            await Habitacion.update({
                ID_ESTADO_HABITACION: 2

            }, { where: { ID_HABITACION: habitacion?.dataValues.ID_HABITACION } });
        }
        if (nuevaFechaInicio < hoy) {
            await Habitacion.update({
                ID_ESTADO_HABITACION: 2

            }, { where: { ID_HABITACION: habitacion?.dataValues.ID_HABITACION } });
        }
        if (nuevaFechaInicio > hoy) {
            console.log(habitacion?.dataValues.ID_HABITACION);
            await Habitacion.update({
                ID_ESTADO_HABITACION: 1

            }, { where: { ID_HABITACION: habitacion?.dataValues.ID_HABITACION } });
        }
        res.json({
            msg: "Se ha actualizado la reserva de habitacion correctamente"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al actualizar la reserva de habitación: " + id_reserva,
            error
        });
    }
};

export const agregarProductoReservaHabitacion = async (req: Request, res: Response) => {
    const { id_reserva } = req.params;
    const { id_producto, cantidad } = req.body;
    const t = await sequelize.transaction(); //para el rollback

    const reserva = await ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "No existe una reserva de habitacion con el id: " + id_reserva
        });
    };
    const producto = await Producto.findOne({ where: { ID_PRODUCTO: id_producto } });
    if (!producto) {
        return res.status(404).json({
            msg: "No existe un producto con el id: " + id_producto
        });
    };
    try {
        const totalProductos = producto?.dataValues.PRECIO_PRODUCTO * cantidad;

        await DetalleReservaHabitacionProducto.create({
            "CANTIDAD": cantidad,
            "TOTAL": totalProductos,
            "ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO": id_producto,
            "ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO": id_reserva
        });

        await ReservaHabitacion.update({
            "TOTAL": totalProductos + reserva?.dataValues.TOTAL
        }, { where: { ID_RESERVA_HABITACION: id_reserva } });

        await t.commit(); // si no hay errores en la transacción, commiteamos
        res.json({
            msg: "Se ha agregado correctamente el producto " + id_producto + " a la reserva de habitacion " + id_reserva
        });
    } catch (error) {
        await t.rollback(); // si hay errores, rollback
        res.status(500).json({
            msg: "Ha ocurrido un error al añadir el producto con id: " + id_producto + " a la reserva de habitacion " + id_reserva,
            error
        });
    }
};

export const updateProductoReservaHabitacion = async (req: Request, res: Response) => {
    const { id_reserva } = req.params;
    const { id_producto, cantidad } = req.body;
    const t = await sequelize.transaction(); //para el rollback

    const reserva = await ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "No existe una reserva con el id: " + id_reserva
        });
    };
    const producto = await Producto.findOne({ where: { ID_PRODUCTO: id_producto } });
    if (!producto) {
        return res.status(404).json({
            msg: "No existe un producto con el id: " + id_producto
        });
    };
    const detalleReservaProducto = await DetalleReservaHabitacionProducto.findOne({
        where: {
            ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO: id_producto,
            ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO: id_reserva
        }
    });
    if (!detalleReservaProducto) {
        return res.status(404).json({
            msg: "Aún no se ha agregado ningún producto con id: " + id_producto + " a la reserva con id " + id_reserva
        });
    };
    try {
        if (cantidad == 0) {
            const totalReservaBorrar = reserva?.dataValues.TOTAL;
            const totalProductosBorrar = detalleReservaProducto?.dataValues.TOTAL;

            await ReservaHabitacion.update({
                "TOTAL": totalReservaBorrar - totalProductosBorrar
            }, { where: { ID_RESERVA_HABITACION: id_reserva } });
            await DetalleReservaHabitacionProducto.destroy({
                where: {
                    ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO: id_producto,
                    ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO: id_reserva
                }
            });
            await t.commit();
            return res.json({
                msg: "Se han quitado todos los productos con id " + id_producto + " de la reserva " + id_reserva
            });
        }

        const totalReservaActual = reserva?.dataValues.TOTAL;
        const totalProductosActual = detalleReservaProducto?.dataValues.TOTAL;

        await ReservaHabitacion.update({
            "TOTAL": totalReservaActual - totalProductosActual
        }, { where: { ID_RESERVA_HABITACION: id_reserva } });

        await DetalleReservaHabitacionProducto.update({
            "CANTIDAD": cantidad,
            "TOTAL": producto?.dataValues.PRECIO_PRODUCTO * cantidad
        }, {
            where: {
                ID_PRODUCTO_DETALLE_RESERVA_HABITACION_PRODUCTO: id_producto,
                ID_RESERVA_HABITACION_DETALLE_RESERVA_HABITACION_PRODUCTO: id_reserva
            }
        });

        const reservaActual = await ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });

        await ReservaHabitacion.update({
            "TOTAL": reservaActual?.dataValues.TOTAL + producto?.dataValues.PRECIO_PRODUCTO * cantidad
        }, { where: { ID_RESERVA_HABITACION: id_reserva } });

        await t.commit(); // si no hay errores en la transacción, commiteamos
        res.json({
            msg: "Se ha actualizado correctamente el número de productos con id " + id_producto + " en la reserva " + id_reserva
        });
    } catch (error) {
        await t.rollback(); // si hay errores, rollback
        res.status(500).json({
            msg: "Ha ocurrido un error al actualizar el número de productos con id: " + id_producto + " en la reserva " + id_reserva,
            error
        });
    }
};

export const verificarEstadosHabitacion = async () => {
    try {
        const fechaHoy = new Date();
        const reservasHoy = await ReservaHabitacion.findAll({
            where: {
                FECHA_INICIO: fechaHoy.toISOString().split('T')[0],
                ID_ESTADO_PAGO_RESERVA_HABITACION: 1
            },
        });

        for (const reserva of reservasHoy) {
            const habitacion = await Habitacion.findOne({ where: { ID_HABITACION: reserva?.dataValues.ID_HABITACION_RESERVA_HABITACION } });
            if (habitacion?.dataValues.ID_ESTADO_HABITACION == 1) {
                await Habitacion.update(
                    { ID_ESTADO_HABITACION: 2 },
                    { where: { ID_HABITACION: reserva?.dataValues.ID_HABITACION_RESERVA_HABITACION } }
                );
                console.log(`Habitacion ${reserva?.dataValues.ID_HABITACION_RESERVA_HABITACION} actualizada a 'Ocupada'`);
            }
        }
    } catch (error) {
        console.error("Error verificando estados de habitaciones:", error);
    }
};

export const finalizarReservaHabitacion = async (req: Request, res: Response) => {
    const { id_reserva } = req.params;
    const { trigger } = req.body;
    const reserva = await ReservaHabitacion.findOne({ where: { ID_RESERVA_HABITACION: id_reserva } });
    if (!reserva) {
        return res.status(404).json({
            msg: "No existe una reserva con el id: " + id_reserva
        });
    };

    try {
        if (trigger == 1) {
            
            await ReservaHabitacion.update({
                "ID_ESTADO_PAGO_RESERVA_HABITACION": 3
    
            }, { where: { ID_RESERVA_HABITACION: id_reserva } });

            await Habitacion.update({
                "ID_ESTADO_HABITACION": 1

            },{where:{ID_HABITACION: reserva?.dataValues.ID_HABITACION_RESERVA_HABITACION}});
            return res.json({
                msg: "La reserva de habitacion "+id_reserva+" ha sido finalizada correctamente"
            })
    
        }
        if (trigger == 0) {
            
            await ReservaHabitacion.update({
                "ID_ESTADO_PAGO_RESERVA_HABITACION": 2
    
            }, { where: { ID_RESERVA_HABITACION: id_reserva } });
            await Habitacion.update({
                "ID_ESTADO_HABITACION": 1

            },{where:{ID_HABITACION: reserva?.dataValues.ID_HABITACION_RESERVA_HABITACION}});
            return res.json({
                msg: "La reserva de habitacion "+id_reserva+" ha sido cancelada correctamente"
            })
    
        }
    } catch (error) {
        res.status(500).json({
            msg: "Ha ocurrido un error al finalizar la reserva de habitacion",
            error
        });
    }
        
    }

