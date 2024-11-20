"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activarProducto = exports.getProducto = exports.deleteProducto = exports.updateProducto = exports.newProducto = exports.getProductos = void 0;
const productoModel_1 = require("../models/productoModel");
const usuarioModel_1 = require("../models/usuarioModel");
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const usuario = yield usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(404).json({
            msg: 'El usuario: ' + id_usuario + ' no existe'
        });
    }
    try {
        const productos = yield productoModel_1.Producto.findAll({ where: { ID_USUARIO_PRODUCTO: id_usuario } });
        res.json(productos);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener la lista de productos.',
            error
        });
    }
});
exports.getProductos = getProductos;
const newProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { id_categoria, nombre_producto, descripcion_producto, precio_producto } = req.body;
    try {
        yield productoModel_1.Producto.create({
            "NOMBRE_PRODUCTO": nombre_producto,
            "DESCRIPCION_PRODUCTO": descripcion_producto,
            "PRECIO_PRODUCTO": precio_producto,
            "ESTADO_PRODUCTO": true,
            "ID_USUARIO_PRODUCTO": id_usuario,
            "ID_CATEGORIA_PRODUCTO": id_categoria
        });
        return res.status(201).json({
            msg: 'Producto creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear el producto',
            error
        });
    }
});
exports.newProducto = newProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    const { id_categoria, nombre_producto, descripcion_producto, precio_producto } = req.body;
    const producto = yield productoModel_1.Producto.findOne({ where: { ID_PRODUCTO: id_producto } });
    if (!producto) {
        return res.status(404).json({
            msg: "No existe un producto con id: " + id_producto
        });
    }
    try {
        yield productoModel_1.Producto.update({
            NOMBRE_PRODUCTO: nombre_producto,
            DESCRIPCION_PRODUCTO: descripcion_producto,
            PRECIO_PRODUCTO: precio_producto,
            ID_CATEGORIA_PRODUCTO: id_categoria
        }, { where: { ID_PRODUCTO: id_producto } });
        return res.json({
            msg: 'Producto con id: ' + id_producto + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el producto: ' + id_producto,
            error
        });
    }
});
exports.updateProducto = updateProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    const producto = yield productoModel_1.Producto.findOne({ where: { ID_PRODUCTO: id_producto } });
    if (!producto) {
        return res.status(404).json({
            msg: "El producto con id: " + id_producto + " no existe"
        });
    }
    try {
        yield productoModel_1.Producto.destroy({ where: { ID_PRODUCTO: id_producto } });
        return res.json({
            msg: 'Producto con id ' + id_producto + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al borrar el producto con id: ' + id_producto,
            error
        });
    }
});
exports.deleteProducto = deleteProducto;
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    try {
        const producto = yield productoModel_1.Producto.findOne({ where: { ID_PRODUCTO: id_producto } });
        if (!producto) {
            return res.status(404).json({
                msg: "El producto con id: " + id_producto + " no existe"
            });
        }
        res.json(producto);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el producto con id: ' + id_producto,
            error
        });
    }
});
exports.getProducto = getProducto;
const activarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    const { trigger } = req.body;
    const producto = yield productoModel_1.Producto.findOne({ where: { ID_PRODUCTO: id_producto } });
    if (!producto) {
        return res.status(404).json({
            msg: "El producto ingresado no existe"
        });
    }
    try {
        if (trigger == 1) {
            yield productoModel_1.Producto.update({
                ESTADO_PRODUCTO: true
            }, { where: { ID_PRODUCTO: id_producto } });
            return res.json({
                msg: "Se ha activado el producto con id: " + id_producto + " correctamente"
            });
        }
        else {
            yield productoModel_1.Producto.update({
                ESTADO_PRODUCTO: false
            }, { where: { ID_PRODUCTO: id_producto } });
            return res.json({
                msg: "Se ha desactivado el producto con id: " + id_producto + " correctamente"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error al cambiar el estado del producto con id: " + id_producto,
            error
        });
    }
});
exports.activarProducto = activarProducto;
