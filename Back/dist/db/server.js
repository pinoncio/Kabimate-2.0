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
const estadoModel_1 = require("../models/estadoModel");
const caba_aModel_1 = require("../models/caba\u00F1aModel");
const pisoModel_1 = require("../models/pisoModel");
const tipoHabitacionModel_1 = require("../models/tipoHabitacionModel");
const habitacionModel_1 = require("../models/habitacionModel");
const categoriaModel_1 = require("../models/categoriaModel");
const productoModel_1 = require("../models/productoModel");
const metodoPagoModel_1 = require("../models/metodoPagoModel");
const estadoPagoModel_1 = require("../models/estadoPagoModel");
const reservaCabaniaModel_1 = require("../models/reservaCabaniaModel");
const detalleReservaCabaniaProductoModel_1 = require("../models/detalleReservaCabaniaProductoModel");
const reservaHabitacionModel_1 = require("../models/reservaHabitacionModel");
const detalleReservaHabitacionProductoModel_1 = require("../models/detalleReservaHabitacionProductoModel");
//importar seeders
const estadoSeeder_1 = require("./seeders/estadoSeeder");
const rolSeeder_1 = require("./seeders/rolSeeder");
const institucionSeeder_1 = require("./seeders/institucionSeeder");
const tipoHabitacionSeeder_1 = require("./seeders/tipoHabitacionSeeder");
const estadoPagoSeeder_1 = require("./seeders/estadoPagoSeeder");
const metodoPagoSeeder_1 = require("./seeders/metodoPagoSeeder");
//importar rutas
const usuarioRoutes_1 = __importDefault(require("../routes/usuarioRoutes"));
const rolRoutes_1 = __importDefault(require("../routes/rolRoutes"));
const institucionRoutes_1 = __importDefault(require("../routes/institucionRoutes"));
const caba_aRoutes_1 = __importDefault(require("../routes/caba\u00F1aRoutes"));
const estadoRoutes_1 = __importDefault(require("../routes/estadoRoutes"));
const pisoRoutes_1 = __importDefault(require("../routes/pisoRoutes"));
const tipoHabitacionRoutes_1 = __importDefault(require("../routes/tipoHabitacionRoutes"));
const habitacionRoutes_1 = __importDefault(require("../routes/habitacionRoutes"));
const categoriaRoutes_1 = __importDefault(require("../routes/categoriaRoutes"));
const productoRoutes_1 = __importDefault(require("../routes/productoRoutes"));
const reservaCabaniaRoutes_1 = __importDefault(require("../routes/reservaCabaniaRoutes"));
const detalleReservaCabaniaProductoRoutes_1 = __importDefault(require("../routes/detalleReservaCabaniaProductoRoutes"));
const reservaHabitacionRoutes_1 = __importDefault(require("../routes/reservaHabitacionRoutes"));
const detalleReservaHabitacionProductoRoutes_1 = __importDefault(require("../routes/detalleReservaHabitacionProductoRoutes"));
const estadoReservaRoutes_1 = __importDefault(require("../routes/estadoReservaRoutes"));
//import de otros
const reservaCabaniaController_1 = require("../controllers/reservaCabaniaController");
const reservaHabitacionController_1 = require("../controllers/reservaHabitacionController");
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
            console.log('Ejecutandose en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/instituciones', institucionRoutes_1.default);
        this.app.use('/api/roles', rolRoutes_1.default);
        this.app.use('/api/usuarios', usuarioRoutes_1.default);
        this.app.use('/api/cabanas', caba_aRoutes_1.default);
        this.app.use('/api/estados', estadoRoutes_1.default);
        this.app.use('/api/pisos', pisoRoutes_1.default);
        this.app.use('/api/tipohabitacion', tipoHabitacionRoutes_1.default);
        this.app.use('/api/habitaciones', habitacionRoutes_1.default);
        this.app.use('/api/categorias', categoriaRoutes_1.default);
        this.app.use('/api/productos', productoRoutes_1.default);
        this.app.use('/api/reservascabania', reservaCabaniaRoutes_1.default);
        this.app.use('/api/detallereservacabanaproducto', detalleReservaCabaniaProductoRoutes_1.default);
        this.app.use('/api/reservashabitacion', reservaHabitacionRoutes_1.default);
        this.app.use('/api/detallereservahabitacionproducto', detalleReservaHabitacionProductoRoutes_1.default);
        this.app.use('/api/estadoreservas', estadoReservaRoutes_1.default);
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
                yield estadoModel_1.Estado.sync();
                yield caba_aModel_1.Cabania.sync();
                yield pisoModel_1.Piso.sync();
                yield tipoHabitacionModel_1.TipoHabitacion.sync();
                yield habitacionModel_1.Habitacion.sync();
                yield categoriaModel_1.Categoria.sync();
                yield productoModel_1.Producto.sync();
                yield estadoPagoModel_1.EstadoPago.sync();
                yield metodoPagoModel_1.MetodoPago.sync();
                yield reservaCabaniaModel_1.ReservaCabania.sync();
                yield detalleReservaCabaniaProductoModel_1.DetalleReservaCabaniaProducto.sync();
                yield reservaHabitacionModel_1.ReservaHabitacion.sync();
                yield detalleReservaHabitacionProductoModel_1.DetalleReservaHabitacionProducto.sync();
                //correr seeders
                yield this.runSeeders();
                setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    yield (0, reservaCabaniaController_1.verificarEstadosCabania)();
                    console.log("Verificación de estados de cabañas realizada");
                }), 60000); // 86400000 ms = 24 horas
                setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    yield (0, reservaHabitacionController_1.verificarEstadosHabitacion)();
                    console.log("Verificación de estados de habitaciones realizada");
                }), 60000); // 86400000 ms = 24 horas
            }
            catch (error) {
                console.log('No se ha podido establecer conexion a la base de datos');
            }
        });
    }
    runSeeders() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, rolSeeder_1.seedRoles)();
            yield (0, estadoSeeder_1.seedEstados)();
            yield (0, institucionSeeder_1.seedInstituciones)();
            yield (0, tipoHabitacionSeeder_1.seedTipoHabitacion)();
            yield (0, estadoPagoSeeder_1.seedEstadosPagos)();
            yield (0, metodoPagoSeeder_1.seedMetodosPagos)();
        });
    }
}
exports.default = Server;
