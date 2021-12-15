import pkg from 'sequelize';
const {Sequelize, DataTypes, QueryTypes, Op} = pkg;
import * as conectServer from '../service/bdConection.js'
import * as companiesFuntion from '../service/companies.js'
const sequelize = conectServer.conect();


const Display = sequelize.define('display', {

    id: {
        type: DataTypes.INTEGER(255),
        primaryKey: true,
        timestamps: false
    },
    name: {
        type: DataTypes.STRING(50),
        primaryKey: false,
        timestamps: false,
        allowNull: false
    },
    company_id: {
        type: DataTypes.INTEGER(255),
        primaryKey: false,
        timestamps: false,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DECIMAL(50,4),
        primaryKey: false,
        timestamps: false,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(50,4),
        primaryKey: false,
        timestamps: false,
        allowNull: false
    },
    //Sequelize.ENUM("pending", "cancelled", "paid")
    type: {
        type: DataTypes.ENUM('INDOOR', 'OUTDOOR'),
        primaryKey: false,
        timestamps: false,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(50.0),
        primaryKey: false,
        timestamps: false,
        allowNull: false
    },
},
    { freezeTableName: true }
)
//Display.hasMany(companiesFuntion.Company, {foreignKey: 'company_id'});
//companiesFuntion.Company.hasOne(Display, {foreignKey: 'company_id'});

// Constultar - Get 
async function consultaDisplay(criterioFiltro) {
    console.log(criterioFiltro)
    if (criterioFiltro == "" || null ) {
        const datos = await Display.findAll({
        })
        return datos;
    } else {
        const datos = await Display.findAll({
            //where: {nombre: criterioFiltro},
            where:  criterioFiltro
        
    });
        return datos;
    }
}
//
async function consultaJoin(countryInfo){
console.log(countryInfo)
try{
    const datos = await sequelize.query("SELECT A.id, A.name,`company_id`,`latitude`,`type`,`longitude`,`price`, B.country FROM `display` as A INNER JOIN `company`as B ON B.id = company_id WHERE B.country = :country",
    {replacements: {country:countryInfo}, type: QueryTypes.SELECT });
       return datos
}catch(e){
    console.log(e)
    console.log('error en join search')
}
}
   
        
        
        
        
    //     include:
    //     [{
    //     model: Company,
    //     required: true,
    //     where: {id: {in county: country}}
    //    }]


// Crear - Post
 // param = {
        //name:'Downtown Office',
        //company_id: req.body.company_id,
        //latitude: 33.33,
        //longitude:44.55,
        //type: 'INDOOR',
        //price: 500.50
    //}
async function agregarDisplay(param) {
    const crear = await Display.create(param);
    return crear
}


// Modificar - PUT
// param = {
        //name:'change',
        //company_id: req.body.company_id,
        //latitude: change,
        //longitude: change,
        //type: change,
        //price: change
    //}
async function actualizarDisplay(param){
    const {id, name, company_id, latitude, longitude, type, price} = param
    const update = await Display.update(
    { name: name,
      compnay_id: company_id,
      latitude: latitude,
      longitude: longitude,
      type: type,
      price: price
    },
    { where: { id: id } 
})
    return update
}
//Eliminar - Delete - Destroy

async function deleteDisplay(param){
    const deleteDisplayList = await Display.destroy(
        { where: { id: param } }
    )
    return deleteDisplayList
}


export {consultaDisplay, agregarDisplay, actualizarDisplay, deleteDisplay, consultaJoin}