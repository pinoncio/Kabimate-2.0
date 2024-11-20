import {Request, Response} from 'express';
import { Producto } from '../models/productoModel';
import { Usuario } from '../models/usuarioModel';

export const getProductos = async(req: Request, res: Response) =>{
    const {id_usuario} = req.params;
    const usuario = await Usuario.findOne({where:{ID_USUARIO:id_usuario}});
    if(!usuario){
        return res.status(404).json({
            msg: 'El usuario: '+id_usuario+ ' no existe'
        })
    }
    try {
        const productos = await Producto.findAll({where: {ID_USUARIO_PRODUCTO: id_usuario}});
        res.json(productos)
    }catch (error) {
        res.status(500).json({ 
            msg: 'Error al obtener la lista de productos.',
        error
    });
    }
};
export const newProducto = async(req: Request, res: Response) =>{
    const {id_usuario} = req.params;
    const { id_categoria, nombre_producto, descripcion_producto, precio_producto} =  req.body;
    try{
        await Producto.create({
            "NOMBRE_PRODUCTO": nombre_producto,
            "DESCRIPCION_PRODUCTO": descripcion_producto,
            "PRECIO_PRODUCTO": precio_producto,
            "ESTADO_PRODUCTO": true,
            "ID_USUARIO_PRODUCTO": id_usuario,
            "ID_CATEGORIA_PRODUCTO": id_categoria
        })
        return res.status(201).json({
            msg: 'Producto creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear el producto',
            error
        })
    }
};
export const updateProducto = async(req: Request, res: Response) => {
    const {id_producto} = req.params;
    const {id_categoria, nombre_producto, descripcion_producto, precio_producto} = req.body;
    const producto = await Producto.findOne({where: {ID_PRODUCTO: id_producto}});
    if (!producto) {
        return res.status(404).json({
            msg: "No existe un producto con id: " + id_producto
        })
    }
    try{
        await Producto.update({
            NOMBRE_PRODUCTO: nombre_producto,
            DESCRIPCION_PRODUCTO: descripcion_producto,
            PRECIO_PRODUCTO: precio_producto,
            ID_CATEGORIA_PRODUCTO: id_categoria
            },
            {where: {ID_PRODUCTO: id_producto}}
        )
        return res.json({
            msg:'Producto con id: ' + id_producto + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el producto: '+id_producto,
                error
            })
        }
};
export const deleteProducto = async(req: Request, res: Response) =>{
    const { id_producto} =  req.params;
    const producto = await Producto.findOne({where: {ID_PRODUCTO: id_producto}});
    if (!producto) {
        return res.status(404).json({
            msg: "El producto con id: " + id_producto + " no existe"
        })
    }
    try{
        await Producto.destroy({where: {ID_PRODUCTO: id_producto}}
        )
        return res.json({
            msg:'Producto con id ' + id_producto + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al borrar el producto con id: '+id_producto,
                error
            })
        }
};
export const getProducto = async(req: Request, res: Response) =>{
    const { id_producto} =  req.params;
    try{
        const producto = await Producto.findOne({where: {ID_PRODUCTO: id_producto}})
        if (!producto) {
            return res.status(404).json({
                msg: "El producto con id: " + id_producto + " no existe"
            })
        }
        res.json(producto)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el producto con id: '+id_producto,
                error
            })
        }
};

export const activarProducto = async(req:Request, res: Response) => {
    const {id_producto} = req.params;
    const {trigger} = req.body;
    const producto = await Producto.findOne({where: {ID_PRODUCTO:id_producto}});
    if(!producto){
        return res.status(404).json({
            msg: "El producto ingresado no existe"
        })
    }
    try{
        if(trigger == 1){
            await Producto.update({
                ESTADO_PRODUCTO: true
            },{where: {ID_PRODUCTO: id_producto}});
            return res.json({
                msg: "Se ha activado el producto con id: "+id_producto+" correctamente"
            })
        }else{
            await Producto.update({
                ESTADO_PRODUCTO: false
        },{where: {ID_PRODUCTO: id_producto}});
        return res.json({
            msg: "Se ha desactivado el producto con id: "+id_producto+" correctamente"
        })
    }
    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al cambiar el estado del producto con id: "+id_producto,
            error
        })

    }
}