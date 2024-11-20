import {Request, Response} from 'express';
import { Categoria } from '../models/categoriaModel';

export const getCategorias = async(req: Request, res: Response) =>{
    const {id_usuario} = req.params;
    try {
        const categorias = await Categoria.findAll({where:{ID_USUARIO_CATEGORIA: id_usuario}});
        res.json(categorias)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la lista de categorias' });
    }
};
export const newCategoria = async(req: Request, res: Response) =>{
    const {id_usuario} = req.params;
    const { nombre_categoria} =  req.body;
    try{
        await Categoria.create({
            "NOMBRE_CATEGORIA": nombre_categoria,
            "ESTADO_CATEGORIA": true,
            "ID_USUARIO_CATEGORIA": id_usuario
        })
        return res.status(201).json({
            msg: 'Categoria creada correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear la categoria',
            error
        })
    }
};
export const updateCategoria = async(req: Request, res: Response) => {
    const {id_categoria} = req.params;
    const {nombre_categoria} = req.body;
    const categoria = await Categoria.findOne({where: {ID_CATEGORIA: id_categoria}})
    if (!categoria) {
        return res.status(404).json({
            msg: "no existe una categoria con id: "+ id_categoria
        })
    }
    try{
        await Categoria.update({
            NOMBRE_CATEGORIA: nombre_categoria,
            },
            {where: {ID_CATEGORIA: id_categoria}}
        )
        return res.json({
            msg:'Categoria con id: ' + id_categoria + ' actualizada correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar la institucion con id: '+id_categoria,
                error
            })
        }
};
export const deleteCategoria = async(req: Request, res: Response) =>{
    const { id_categoria} =  req.params;
    const categoria = await Categoria.findOne({where: {ID_CATEGORIA: id_categoria}})
    if (!categoria) {
        return res.status(404).json({
            msg: "La categoria con id: " + id_categoria + " no existe"
        })
    }
    try{
        await Categoria.destroy({where: {ID_CATEGORIA: id_categoria}}
        )
        return res.json({
            msg:'Categoria con id ' + id_categoria + ' borrada correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al borrar la categoria con id: '+id_categoria,
                error
            })
        }
};
export const getCategoria = async(req: Request, res: Response) =>{
    const { id_categoria} =  req.params;
    try{
        const categoria = await Categoria.findOne({where: {ID_CATEGORIA: id_categoria}})
        if (!categoria) {
            return res.status(404).json({
                msg: "La categoria con id: " + id_categoria + " no existe"
            })
        }
        res.json(categoria)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar la categoria con id: '+id_categoria,
                error
            })
        }
};

export const activarCategoria = async(req:Request, res: Response) => {
    const {id_categoria} = req.params;
    const {trigger} = req.body;
    const categoria = await Categoria.findOne({where: {ID_CATEGORIA:id_categoria}});
    if(!categoria){
        return res.status(404).json({
            msg: "La categoria ingresada no existe"
        })
    }
    try{
        if(trigger == 1){
            await Categoria.update({
                ESTADO_CATEGORIA: true
            },{where: {ID_CATEGORIA: id_categoria}});
            return res.json({
                msg: "Se ha activado la categoria con id: "+id_categoria+" correctamente"
            })
        }else{
            await Categoria.update({
                ESTADO_CATEGORIA: false
        },{where: {ID_CATEGORIA: id_categoria}});
        return res.json({
            msg: "Se ha desactivado la categoria con id: "+id_categoria+" correctamente"
        })
    }
    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al cambiar el estado de la categoria con id: "+id_categoria,
            error
        })

    }
};