import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('Kabimate', 'admin', 'admin', {   

    host: 'localhost',
    dialect: 'postgres',
});
 
export default sequelize;  