import express, {Application} from 'express';
import cors from 'cors';

//importar modelos
import { Rol } from '../models/rolModel';
import { Institucion } from '../models/institucionModel';
import { Usuario } from '../models/usuarioModel';
import { Estado } from '../models/estadoModel';
import { Cabania } from '../models/cabañaModel';
import { Piso } from '../models/pisoModel';
//importar seeders
import { seedEstados } from './seeders/estadoSeeder';
import { seedRoles } from './seeders/rolSeeder';
import { seedInstituciones } from './seeders/institucionSeeder';
//importar rutas
import routesUsuario from '../routes/usuarioRoutes';
import routesRol from '../routes/rolRoutes';
import routesInstitucion from '../routes/institucionRoutes';
import routesCabaña from '../routes/cabañaRoutes';
import routesEstado from '../routes/estadoRoutes';
import routesPiso from '../routes/pisoRoutes';

class Server {
    private app: Application;
    private port: string;
    
    constructor() {
        this.app= express();
        this.port = process.env.PORT || '3001';

        this.midlewares();
        this.routes();
        this.listen();
        this.dbConnect();

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Ejecutandose en el puerto ' + this.port);
        })
    }
    routes() {
        this.app.use('/api/instituciones', routesInstitucion);
        this.app.use('/api/roles', routesRol);
        this.app.use('/api/usuarios', routesUsuario);
        this.app.use('/api/cabanas', routesCabaña);
        this.app.use('/api/estados', routesEstado);
        this.app.use('/api/pisos', routesPiso);
    }
    midlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect(){
        try {
            await Rol.sync();
            await Institucion.sync();
            await Usuario.sync();
            await Estado.sync();
            await Cabania.sync();
            await Piso.sync();

            //correr seeders
            await this.runSeeders();

        } catch (error){
            console.log('No se ha podido establecer conexion a la base de datos')
        }
    }

    async runSeeders(){
        await seedRoles();
        await seedEstados();
        await seedInstituciones();

    }
}
export default Server;