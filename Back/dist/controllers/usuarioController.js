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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarios = exports.getUsuario = exports.loginUser = exports.updateUsuario = exports.activarUsuario = exports.newUsuario = void 0;
const usuarioModel_1 = require("../models/usuarioModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rolModel_1 = require("../models/rolModel");
const institucionModel_1 = require("../models/institucionModel");
const newUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, rut_usuario, contrasenia, nombre1_usuario, nombre2_usuario, apellido1_usuario, apellido2_usuario, rol_usuario, institucion_usuario } = req.body;
    const usuarioCorreo = yield usuarioModel_1.Usuario.findOne({ where: { EMAIL_USUARIO: email } });
    const usuarioRut = yield usuarioModel_1.Usuario.findOne({ where: { RUT_USUARIO: rut_usuario } });
    const institucion = yield institucionModel_1.Institucion.findOne({ where: { ID_INSTITUCION: institucion_usuario } });
    const rol = yield rolModel_1.Rol.findOne({ where: { ID_ROL: rol_usuario } });
    if (usuarioCorreo) {
        return res.status(400).json({
            msg: 'Ya existe una cuenta con el email ingresado'
        });
    }
    if (usuarioRut) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con el rut ingresado'
        });
    }
    const hashedpassword = yield bcrypt_1.default.hash(contrasenia, 10);
    try {
        yield usuarioModel_1.Usuario.create({
            "RUT_USUARIO": rut_usuario,
            "CONTRASENIA_USUARIO": hashedpassword,
            "NOMBRE1_USUARIO": nombre1_usuario,
            "NOMBRE2_USUARIO": nombre2_usuario,
            "APELLIDO1_USUARIO": apellido1_usuario,
            "APELLIDO2_USUARIO": apellido2_usuario,
            "EMAIL_USUARIO": email,
            "ESTADO_CUENTA": true,
            "ID_INSTITUCION_USUARIO": institucion_usuario,
            "ID_ROL_USUARIO": rol_usuario
        });
        return res.status(201).json({
            msg: 'Usuario creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al crear una cuenta',
            error
        });
    }
});
exports.newUsuario = newUsuario;
const activarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { trigger } = req.body;
    const usuario = yield usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(404).json({
            msg: "El usuario ingresado no existe"
        });
    }
    try {
        if (trigger == 1) {
            yield usuarioModel_1.Usuario.update({
                ESTADO_CUENTA: true
            }, { where: { ID_USUARIO: id_usuario } });
            return res.json({
                msg: "Se ha activado la cuenta del usuario " + id_usuario + " correctamente"
            });
        }
        else {
            yield usuarioModel_1.Usuario.update({
                ESTADO_CUENTA: false
            }, { where: { ID_USUARIO: id_usuario } });
            return res.json({
                msg: "Se ha desactivado la cuenta del usuario " + id_usuario + " correctamente"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error al activar la cuenta : " + id_usuario,
            error
        });
    }
});
exports.activarUsuario = activarUsuario;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { email, rut_usuario, contrasenia, nombre1_usuario, nombre2_usuario, apellido1_usuario, apellido2_usuario } = req.body;
    const usuario = yield usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
    if (!usuario) {
        return res.status(404).json({
            msg: "El usuario ingresado no existe"
        });
    }
    if (usuario.dataValues.ESTADO_CUENTA == false) {
        return res.status(404).json({
            msg: "La cuenta de usuario actualmente se encuentra suspendida, porfavor contacte a soporte"
        });
    }
    ;
    try {
        if (contrasenia || contrasenia != null) {
            const hashedpassword = yield bcrypt_1.default.hash(contrasenia, 10);
            yield usuarioModel_1.Usuario.update({
                RUT_USUARIO: rut_usuario,
                CONTRASENIA_USUARIO: hashedpassword,
                NOMBRE1_USUARIO: nombre1_usuario,
                NOMBRE2_USUARIO: nombre2_usuario,
                APELLIDO1_USUARIO: apellido1_usuario,
                APELLIDO2_USUARIO: apellido2_usuario,
                EMAIL_USUARIO: email,
            }, { where: { ID_USUARIO: id_usuario } });
            return res.json({
                msg: "Se ha actualizado la informacion de la cuenta del usuario " + id_usuario + " correctamente"
            });
        }
        else {
            yield usuarioModel_1.Usuario.update({
                RUT_USUARIO: rut_usuario,
                NOMBRE1_USUARIO: nombre1_usuario,
                NOMBRE2_USUARIO: nombre2_usuario,
                APELLIDO1_USUARIO: apellido1_usuario,
                APELLIDO2_USUARIO: apellido2_usuario,
                EMAIL_USUARIO: email,
            }, { where: { ID_USUARIO: id_usuario } });
            return res.json({
                msg: "Se ha actualizado la informacion de la cuenta del usuario " + id_usuario + " correctamente"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error al actualizar la informacion de la cuenta : " + id_usuario,
            error
        });
    }
});
exports.updateUsuario = updateUsuario;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contrasenia } = req.body;
    const usuario = yield usuarioModel_1.Usuario.findOne({ where: { EMAIL_USUARIO: email } });
    if (!usuario) {
        return res.status(401).json({
            msg: 'El email ingresado no es valido'
        });
    }
    if (usuario.ESTADO_CUENTA == false) {
        return res.status(401).json({
            msg: 'La cuenta esta bloqueada, porfavor contacta al administrador'
        });
    }
    const password = yield bcrypt_1.default.compare(contrasenia, usuario.CONTRASENIA_USUARIO);
    if (!password) {
        return res.status(401).json({
            msg: 'Contraseña Incorrecta'
        });
    }
    const usuarioRol = usuario.dataValues.ID_ROL_USUARIO;
    const usuarioId = usuario.dataValues.ID_USUARIO;
    const token = jsonwebtoken_1.default.sign({
        email: email,
        rol: usuarioRol
    }, process.env.SECRET_KEY || 'PRUEBA1', { expiresIn: '10m' }); // , {expiresIn: '10000'} como tercer parametro para timepo de expiracion del token
    res.json({ token, rol: usuarioRol, idUsuario: usuarioId });
});
exports.loginUser = loginUser;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    try {
        const usuario = yield usuarioModel_1.Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
        if (!usuario) {
            return res.status(404).json({
                msg: "El usuario con id: " + id_usuario + " no existe"
            });
        }
        res.json(usuario);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el usuario con id: ' + id_usuario,
            error
        });
    }
});
exports.getUsuario = getUsuario;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuarioModel_1.Usuario.findAll();
        res.json(usuarios);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al obtener la lista de usuarios',
            error
        });
    }
});
exports.getUsuarios = getUsuarios;
