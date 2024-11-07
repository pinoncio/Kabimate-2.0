import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno del archivo .env
dotenv.config();

// Usar la URL de conexión con la opción de SSL configurada correctamente
const sequelize = new Sequelize(process.env.DB_DATABASE as string,process.env.DB_USER as string, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl:{
            require:true,
            rejectUnauthorized: false
        },
        logging: false

    }
});
export default sequelize;