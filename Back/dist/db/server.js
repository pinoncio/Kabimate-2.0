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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//importar modelos
const rolModel_1 = require("../models/rolModel");
const institucionModel_1 = require("../models/institucionModel");
const usuarioModel_1 = require("../models/usuarioModel");
//importar rutas
const usuarioRoutes_1 = __importDefault(require("../routes/usuarioRoutes"));
const rolRoutes_1 = __importDefault(require("../routes/rolRoutes"));
const institucionRoutes_1 = __importDefault(require("../routes/institucionRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.midlewares();
        this.routes();
        this.listen();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Ejecutandoce en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/instituciones', institucionRoutes_1.default);
        this.app.use('/api/roles', rolRoutes_1.default);
        this.app.use('/api/usuarios', usuarioRoutes_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield rolModel_1.Rol.sync();
                yield institucionModel_1.Institucion.sync();
                yield usuarioModel_1.Usuario.sync();
            }
            catch (error) {
                console.log('No se ha podido establecer conexion a la base de datos');
            }
        });
    }
}
exports.default = Server;
