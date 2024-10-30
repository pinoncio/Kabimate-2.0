import express, {Application} from 'express';
import cors from 'cors';

//importar modelos
import { Rol } from '../models/rolModel';
import { Institucion } from '../models/institucionModel';
import { Usuario } from '../models/usuarioModel';
//importar rutas
import routesUsuario from '../routes/usuarioRoutes';
import routesRol from '../routes/rolRoutes';
import routesInstitucion from '../routes/institucionRoutes';

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
            console.log('Ejecutandoce en el puerto ' + this.port);
        })
    }
    routes() {
        this.app.use('/api/instituciones', routesInstitucion);
        this.app.use('/api/roles', routesRol);
        this.app.use('/api/usuarios', routesUsuario);
        
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


        } catch (error){
            console.log('No se ha podido establecer conexion a la base de datos')
        }
    }
}
export default Server;