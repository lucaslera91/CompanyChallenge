
import pkg from 'sequelize';
const {Sequelize, DataTypes, Op} = pkg;
import dotenv from 'dotenv';

dotenv.config();

function conect(){
    const sequelize = new Sequelize(process.env.db_name, process.env.db_USUARIO, process.env.db_CONTRASE,
        {
            host: process.env.db_host,
    
            dialect: process.env.db_DIALECT,
    
            port: process.env.db_PORT,
    
            timezone: process.env.db_TIMEZONE,
    
            define: {
                timestamps: false
            }
        });
    return sequelize;
}

export { conect };



