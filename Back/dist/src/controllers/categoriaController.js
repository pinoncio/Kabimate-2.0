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
exports.activarCategoria = exports.getCategoria = exports.deleteCategoria = exports.updateCategoria = exports.newCategoria = exports.getCategorias = void 0;
const categoriaModel_1 = require("../models/categoriaModel");
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    try {
        const categorias = yield categoriaModel_1.Categoria.findAll({ where: { ID_USUARIO_CATEGORIA: id_usuario } });
        res.json(categorias);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la lista de categorias' });
    }
});
exports.getCategorias = getCategorias;
const newCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { nombre_categoria } = req.body;
    try {
        yield categoriaModel_1.Categoria.create({
            "NOMBRE_CATEGORIA": nombre_categoria,
            "ESTADO_CATEGORIA": true,
            "ID_USUARIO_CATEGORIA": id_usuario
        });
        return res.status(201).json({
            msg: 'Categoria creada correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear la categoria',
            error
        });
    }
});
exports.newCategoria = newCategoria;
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_categoria } = req.params;
    const { nombre_categoria } = req.body;
    const categoria = yield categoriaModel_1.Categoria.findOne({ where: { ID_CATEGORIA: id_categoria } });
    if (!categoria) {
        return res.status(404).json({
            msg: "no existe una categoria con id: " + id_categoria
        });
    }
    try {
        yield categoriaModel_1.Categoria.update({
            NOMBRE_CATEGORIA: nombre_categoria,
        }, { where: { ID_CATEGORIA: id_categoria } });
        return res.json({
            msg: 'Categoria con id: ' + id_categoria + ' actualizada correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la institucion con id: ' + id_categoria,
            error
        });
    }
});
exports.updateCategoria = updateCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_categoria } = req.params;
    const categoria = yield categoriaModel_1.Categoria.findOne({ where: { ID_CATEGORIA: id_categoria } });
    if (!categoria) {
        return res.status(404).json({
            msg: "La categoria con id: " + id_categoria + " no existe"
        });
    }
    try {
        yield categoriaModel_1.Categoria.destroy({ where: { ID_CATEGORIA: id_categoria } });
        return res.json({
            msg: 'Categoria con id ' + id_categoria + ' borrada correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al borrar la categoria con id: ' + id_categoria,
            error
        });
    }
});
exports.deleteCategoria = deleteCategoria;
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_categoria } = req.params;
    try {
        const categoria = yield categoriaModel_1.Categoria.findOne({ where: { ID_CATEGORIA: id_categoria } });
        if (!categoria) {
            return res.status(404).json({
                msg: "La categoria con id: " + id_categoria + " no existe"
            });
        }
        res.json(categoria);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la categoria con id: ' + id_categoria,
            error
        });
    }
});
exports.getCategoria = getCategoria;
const activarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_categoria } = req.params;
    const { trigger } = req.body;
    const categoria = yield categoriaModel_1.Categoria.findOne({ where: { ID_CATEGORIA: id_categoria } });
    if (!categoria) {
        return res.status(404).json({
            msg: "La categoria ingresada no existe"
        });
    }
    try {
        if (trigger == 1) {
            yield categoriaModel_1.Categoria.update({
                ESTADO_CATEGORIA: true
            }, { where: { ID_CATEGORIA: id_categoria } });
            return res.json({
                msg: "Se ha activado la categoria con id: " + id_categoria + " correctamente"
            });
        }
        else {
            yield categoriaModel_1.Categoria.update({
                ESTADO_CATEGORIA: false
            }, { where: { ID_CATEGORIA: id_categoria } });
            return res.json({
                msg: "Se ha desactivado la categoria con id: " + id_categoria + " correctamente"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error al cambiar el estado de la categoria con id: " + id_categoria,
            error
        });
    }
});
exports.activarCategoria = activarCategoria;
