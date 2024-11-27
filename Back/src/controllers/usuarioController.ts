import {Request, Response} from 'express';
import { Usuario } from '../models/usuarioModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Rol } from '../models/rolModel';
import { Institucion } from '../models/institucionModel';
import * as XLSX from 'xlsx';

export const newUsuario = async(req: Request, res: Response) => {
    const {email,rut_usuario, contrasenia, nombre1_usuario, nombre2_usuario, apellido1_usuario, apellido2_usuario, rol_usuario, institucion_usuario} = req.body;
    const usuarioCorreo = await Usuario.findOne({where: {EMAIL_USUARIO: email}});
    const usuarioRut = await Usuario.findOne({where: {RUT_USUARIO: rut_usuario}});
    const institucion = await Institucion.findOne({where: {ID_INSTITUCION: institucion_usuario}});
    const rol = await Rol.findOne({where: {ID_ROL: rol_usuario}});
    if(usuarioCorreo) {
        return res.status(400).json({
            msg: 'Ya existe una cuenta con el email ingresado'
        })
    }
    if(usuarioRut) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con el rut ingresado'
        })
    }
    
    const hashedpassword = await bcrypt.hash(contrasenia, 10);
    try{
        await Usuario.create({
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
        })
        return res.status(201).json({
            msg: 'Usuario creado correctamente'
            
        })
    }catch(error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al crear una cuenta',
            error
        })
    }
};

export const activarUsuario = async (req:Request, res: Response) =>{
    const {id_usuario} = req.params;
    const {trigger} = req.body;
    const usuario = await Usuario.findOne({where: {ID_USUARIO:id_usuario}});
    if(!usuario){
        return res.status(404).json({
            msg: "El usuario ingresado no existe"
        })
    }
    try{
        if(trigger == 1){
            await Usuario.update({
                ESTADO_CUENTA: true
            },{where: {ID_USUARIO: id_usuario}});
            return res.json({
                msg: "Se ha activado la cuenta del usuario "+id_usuario+" correctamente"
            })
        }else{
            await Usuario.update({
                ESTADO_CUENTA: false
        },{where: {ID_USUARIO: id_usuario}});
        return res.json({
            msg: "Se ha desactivado la cuenta del usuario "+id_usuario+" correctamente"
        })
    }
    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al activar la cuenta : "+id_usuario,
            error
        })

    }
};

export const updateUsuario = async (req: Request, res: Response)=> {
    const {id_usuario} = req.params;
    const {email,rut_usuario, contrasenia, nombre1_usuario, nombre2_usuario, apellido1_usuario, apellido2_usuario} = req.body;

    const usuario = await Usuario.findOne({where: {ID_USUARIO: id_usuario}});

    if(!usuario){
        return res.status(404).json({
            msg: "El usuario ingresado no existe"
        })

    }
    if(usuario.dataValues.ESTADO_CUENTA == false){
        return res.status(404).json({
            msg: "La cuenta de usuario actualmente se encuentra suspendida, porfavor contacte a soporte"
        })

    };
    
    try{
        if(contrasenia || contrasenia != null){
            const hashedpassword = await bcrypt.hash(contrasenia, 10);
            await Usuario.update({
                RUT_USUARIO: rut_usuario,
                CONTRASENIA_USUARIO: hashedpassword,
                NOMBRE1_USUARIO: nombre1_usuario,
                NOMBRE2_USUARIO: nombre2_usuario,
                APELLIDO1_USUARIO: apellido1_usuario,
                APELLIDO2_USUARIO: apellido2_usuario,
                EMAIL_USUARIO: email,
                
            },{where: {ID_USUARIO: id_usuario}});
            return res.json({
                msg: "Se ha actualizado la informacion de la cuenta del usuario "+id_usuario+" correctamente"
            })
        }else{
            await Usuario.update({
                RUT_USUARIO: rut_usuario,
                NOMBRE1_USUARIO: nombre1_usuario,
                NOMBRE2_USUARIO: nombre2_usuario,
                APELLIDO1_USUARIO: apellido1_usuario,
                APELLIDO2_USUARIO: apellido2_usuario,
                EMAIL_USUARIO: email,
                
            },{where: {ID_USUARIO: id_usuario}});
            return res.json({
                msg: "Se ha actualizado la informacion de la cuenta del usuario "+id_usuario+" correctamente"
            })
            }

    }catch(error){
        return res.status(400).json({
            msg: "Ha ocurrido un error al actualizar la informacion de la cuenta : "+id_usuario,
            error
        })

    }
};

export const loginUser = async(req: Request, res: Response) =>{

    const { email, contrasenia } = req.body;
    const usuario: any = await Usuario.findOne({where: {EMAIL_USUARIO: email}})
    if(!usuario) {
        return res.status(401).json({
            msg: 'El email ingresado no es valido'
        })
    }
    if(usuario.ESTADO_CUENTA == false) {
        return res.status(401).json({
            msg: 'La cuenta esta bloqueada, porfavor contacta al administrador'
        })
    }
    const password = await bcrypt.compare(contrasenia, usuario.CONTRASENIA_USUARIO)
    if(!password) {
        return res.status(401).json({
            msg: 'Contraseña Incorrecta'
        })
    }
    const usuarioRol = usuario.dataValues.ID_ROL_USUARIO
    const usuarioId = usuario.dataValues.ID_USUARIO
    const token = jwt.sign({
        email: email,
        rol: usuarioRol
    }, process.env.SECRET_KEY || 'PRUEBA1',{expiresIn: '30m'}); // , {expiresIn: '10000'} como tercer parametro para timepo de expiracion del token
    res.json({token, rol: usuarioRol, idUsuario: usuarioId});
};

export const getUsuario = async(req: Request, res: Response)=> {
    const { id_usuario } = req.params;
    try{
        const usuario = await Usuario.findOne({where: {ID_USUARIO: id_usuario}})
        if (!usuario) {
            return res.status(404).json({
                msg: "El usuario con id: " + id_usuario + " no existe"
            })
        }
        res.json(usuario)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el usuario con id: '+id_usuario,
                error
            })
        }
};

export const getUsuarios = async(req: Request, res: Response)=> {
    try{
        const usuarios = await Usuario.findAll()
        res.json(usuarios)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al obtener la lista de usuarios',
                error
            })
        }
};

export const registroMasivo = async (req: Request, res: Response) => {
    try {
        // si no llega un archivo
        if (!req.file) {
            return res.status(400).json({
                msg: 'No se ha enviado ningún archivo'
            });
        }

        // lectura
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; // Seleccionamos la primera hoja
        const sheet = workbook.Sheets[sheetName];

        // contenido de la hoja a JSON
        var usuariosData: any[] = XLSX.utils.sheet_to_json(sheet);


                usuariosData = usuariosData.map(usuarioData => {
                    const normalizedData: any = {};
        
                    Object.keys(usuarioData).forEach(key => {
                        // Reemplazar espacios y otros caracteres por guiones bajos
                        const normalizedKey = key.trim().replace(/\s+/g, '_').toLowerCase();
                        normalizedData[normalizedKey] = usuarioData[key];
                    });
        
                    return normalizedData;
                });

        const errores: string[] = [];

        const eliminarTildes = (cadena: string): string => {
            return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };


        for (const usuarioData of usuariosData) {

            // Verificar si los datos esenciales están vacíos
            if (!usuarioData.email || !usuarioData.rut_usuario || !usuarioData.nombre1_usuario || !usuarioData.apellido1_usuario || !usuarioData.institucion_usuario || !usuarioData.tipo_institucion) {
                errores.push(`Faltan datos obligatorios en la fila: ${JSON.stringify(usuarioData)}`);
                continue; // Saltar al siguiente usuario si falta información crítica
            }


            

            const usuarioCorreo = await Usuario.findOne({ where: { EMAIL_USUARIO: usuarioData.email } });
            const usuarioRut = await Usuario.findOne({ where: { RUT_USUARIO: usuarioData.rut_usuario } });

            if (usuarioCorreo) {
                errores.push(`El email ${usuarioData.email} ya está registrado.`);
                continue;
            }

            if (usuarioRut) {
                errores.push(`El rut ${usuarioData.rut_usuario} ya está registrado.`);
                continue;
            }

            const institucion = await Institucion.findOne({ where: {NOMBRE_INSTITUCION: usuarioData.institucion_usuario, TIPO_INSTITUCION: usuarioData.tipo_institucion}});
            var idInstitucion = institucion?.dataValues.ID_INSTITUCION
            if (!institucion) {
                const nuevaInstitucion = await Institucion.create({
                    "NOMBRE_INSTITUCION": usuarioData.institucion_usuario,
                    "TIPO_INSTITUCION": usuarioData.tipo_institucion,
                    "ESTADO_INSTITUCION": true
                    
                })
                var idInstitucion = nuevaInstitucion.dataValues.ID_INSTITUCION
            }

            const primerNombre = eliminarTildes(usuarioData.nombre1_usuario.charAt(0) || ''); 
            const primerApellido = eliminarTildes(usuarioData.apellido1_usuario || ''); 
            const primerNumeroRut = usuarioData.rut_usuario.charAt(0) || ''; 

            const contrasenaGenerada = `${primerNombre}${primerApellido}${primerNumeroRut}`;
            console.log(contrasenaGenerada)

            const hashedPassword = await bcrypt.hash(contrasenaGenerada, 10);


            await Usuario.create({
                RUT_USUARIO: usuarioData.rut_usuario,
                CONTRASENIA_USUARIO: hashedPassword,
                NOMBRE1_USUARIO: usuarioData.nombre1_usuario,
                NOMBRE2_USUARIO: usuarioData.nombre2_usuario,
                APELLIDO1_USUARIO: usuarioData.apellido1_usuario,
                APELLIDO2_USUARIO: usuarioData.apellido2_usuario,
                EMAIL_USUARIO: usuarioData.email,
                ESTADO_CUENTA: true,
                ID_INSTITUCION_USUARIO: idInstitucion,
                ID_ROL_USUARIO: 2
            });
        }

        if (errores.length > 0) {
            return res.status(400).json({
                msg: 'Algunos usuarios no pudieron ser registrados',
                errores
            });
        }


        return res.status(201).json({
            msg: 'Usuarios registrados correctamente'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Ha ocurrido un error al procesar el archivo',
            error
        });
    }
};