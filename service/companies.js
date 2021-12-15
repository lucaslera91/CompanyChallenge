
import pkg from 'sequelize';
const {Sequelize, DataTypes, Op} = pkg;
import * as conectServer from '../service/bdConection.js'
const sequelize = conectServer.conect();

const Company = sequelize.define('company', {

    id: {
        type: DataTypes.INTEGER(225),
        primaryKey: true,
        timestamps: false
    },
    name: {
        type: DataTypes.STRING(50),
        primaryKey: false,
        timestamps: false,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(20),
        primaryKey: false,
        timestamps: false,
        allowNull: false
    },
},
    { freezeTableName: true }
)

// Constultar - Get
async function consultaCompany(criterioFiltro) {
    if (criterioFiltro == "" || null ) {
        const datos = await Company.findAll({
        })
        return datos;
    } else {
        const datos = await Company.findAll({
            //where: {nombre: criterioFiltro},
            where: criterioFiltro
    });
        return datos;
    }
}

// Crear - Post
 // param = {
    //    id:
    //    name:
    //    country:
    //}
async function agregarCompany(param) {
    const crear = await Company.create(param);
    return crear
}


// Modificar - PUT
//param = {
    //    id: should comein URL
    //    name: change
    //    country: change
    //}
async function actualizarCompany(param){
    const {id, name, country} = param
    const update = await Company.update(
    { name: name, country: country},
    { where: { id: id } 
})
    return update
}
//Eliminar - Delete - Destroy

async function deleteCompany(param){
    const deleteCompany = await Company.destroy(
    { where: { id: param } 
})
    return deleteCompany
}


export {consultaCompany, agregarCompany, actualizarCompany, deleteCompany, Company}
