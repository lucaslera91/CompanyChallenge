import express from 'express';
import cors from 'cors'
import * as companyFunctions from './service/companies.js'
import * as displayFunctions from './service/displays.js'
import bodyParser from 'body-parser';
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 3000;

//Companies
// POST /companies  (crea una empresa nueva)
// param = { id:'', name:'', country: ''}
app.post('/companies', async (req, res) => {
    //Validamos nombre de empresa
    const validacion = await companyFunctions.consultaCompany({name: req.body.name});
    if (validacion.length != 0){
        res.status(200).json({msg:'Empresa ya registrada'})
    }else{
        try{
            const data = await companyFunctions.agregarCompany({
                name: req.body.name,
                country: req.body.country
            })
            const {name, country} = data
            res.status(200).json({msg:'Empresa creada', name, country})
        }catch(e){
            console.log(e)
            res.status(400).send('Error 400 en configuracion - revisar Datos')
        }
    }
})

// PUT /companies/{company_id}  (edita una empresa)
app.put('/companies/:company_id', async (req, res) => {
    const company_id = req.params.company_id
    console.log(req.params.company_id)
    //validamos si existe
    try{
        const validacion = await companyFunctions.consultaCompany({id: parseInt(company_id)});
        if (validacion.length == 0){
            res.status(200).json({msg:'Empresa no registrada'})
        }else{
         // modificamos
            const update = await companyFunctions.actualizarCompany({
                id: company_id,
                name: req.body.name,
                country: req.body.country
            });
            res.status(200).json({msg: `Empresa id: ${update}, modificada exitosamente`})
            }
    } catch(e){
             console.log(e)
             res.status(400).send('Ese id de empresa no es correcto')
         }
      })
// GET /companies  (devuelve una lista de todas las empresas)

app.get('/companies', async (req, res) => {
    try{
        const data = await companyFunctions.consultaCompany('')
        res.status(200).json({msg:'Lista de todas las empresas', data})

    }catch(e){
        console.log(e)
        res.status(400).send('Error en configuracion')
    }
})

// GET /companies/{company_id}  (devuelve una empresa)
app.get('/companies/:company_id', async (req, res) => {
    const company_id = req.params.company_id
    //validamos si existe
    try{
        const data = await companyFunctions.consultaCompany({id: parseInt(company_id)});
        if(data.length ==0){
            res.status(200).json({msg:'Empresa no registrada'})
        }else{
            res.status(200).json({msg: `Company Selected`, data})
        }
    }catch(e){
        res.status(400).json('Error en configuracion')
    }
})

// DELETE /companies/{company_id}  (borra una empresa)
app.delete('/companies/:company_id', async (req, res) => {
    const company_id = req.params.company_id
    try{
        const validacion = await companyFunctions.consultaCompany({id: parseInt(company_id)});
        if (validacion.length == 0){
            res.status(200).json({msg:'Empresa no registrada'})
        }else{
            const companyDelete = await companyFunctions.deleteCompany(company_id)
            if (companyDelete){
                 res.status(200).json({msg: `Company deleted`, validacion})
            }
        }
    } catch(e){
        console.log(e)
        res.status(400).send('Error en el dato - revisar que sea Id')

    }
    //validamos si existe
    const validacion = await companyFunctions.consultaCompany({id: parseInt(company_id)});
      
})



//Displays

// POST /displays  (crea una pantalla nueva)
app.post('/displays', async (req, res) => {
    
    const crearDisplay = await displayFunctions.agregarDisplay({
        name: req.body.name,
        company_id: req.body.company_id,
        latitude: req.body.latitude,
        longitude:req.body.longitude,
        type: req.body.type,
        price: req.body.price
    })
    res.status(200).json({msg: 'Post display creada', crearDisplay})
})
// PUT /displays/{display_id}  (edita una pantalla)
app.put('/displays/:display_id', async (req, res) => {
    const display_id = req.params.display_id
    //validamos si existe
    try{
        const validacion = await displayFunctions.consultaDisplay({id:display_id});
        if (validacion.length == 0){
            res.status(200).json({msg:'Pantalla no registrada'})
        }else{
            // modificamos
            const update = await displayFunctions.actualizarDisplay({
                   id: display_id,
                   name: req.body.name,
                   latitude: req.body.latitude,
                   longitude: req.body.longitude,
                   type: req.body.type,
                   company_id: req.body.company_id,
                   price: req.body.price
                 })
                 if(update){
                    res.status(200).json({msg: `Pantalla modificada exitosamente`})

                 }
            }
    }catch(e){
        console.log(e)
        res.status(400).send('Error en configuracion')
    }
})
// GET /displays  (devuelve una lista de todas las pantallas) se debe poder agregar ? parametro country
app.get(`/displays`, async (req, res) => {

    const country = req.url
    const url_string = "htpp://localhost:3000/"+country; //window.location.href
    const url = new URL(url_string);
    const c = url.searchParams.get("country");
    console.log(c);

    if (c == '' || c == null){
        try{
            const data = await displayFunctions.consultaDisplay('')
            res.status(200).json(({msg:'Busqueda exitosa', data}))
            //res.status(200).json(({msg:'Busqueda exitosa', c, url, country}))
        }catch(e){
            console.log(e)
            res.status(400).json(({msg:'Error en la configuracion'}))
        }
    }else{
        const search = await displayFunctions.consultaJoin(c)
        res.status(200).json(({msg:'Busqueda exitosa', search}))
    }


    
})
// GET /displays/{display_id}  (devuelve una pantalla)
app.get('/displays/:display_id', async (req, res) => {
    try{
        const data = await displayFunctions.consultaDisplay({id: parseInt(req.params.display_id)})
        if (data.length == 0){
            return res.status(200).json({msg:'No display with that id'})
        }else {
            return res.status(200).json({msg:'Lista de pantalla', data})
        } 
    }catch(e){
        console.log(e)
        res.status(400).json({msg:'Error en la configuracion'})
    }
})
// DELETE /displays/{display_id}  (borra una pantalla)
app.delete('/displays/:display_id', async (req, res) => {
    const display_id = parseInt(req.params.display_id)
    //validamos si existe
    try{
        const validacion = await displayFunctions.consultaDisplay(display_id);
        if(validacion.length == 0){
            return res.status(200).json({msg:'Display no registrado'})
        }else{
            const displayDelete = await displayFunctions.deleteDisplay(display_id)
            if (displayDelete){
                 res.status(200).json({msg: `Display deleted`})
            } 
        }
        
    }catch(e){
        console.log(e)
        res.status(400).json('Error en configuracion')
    }
})
//GET /companies/{company_id}/displays (devuelve una lista de todas las pantallas de una empresa)

app.get('/companies/:company_id/displays', async (req, res) => {
    try{
        const data = await displayFunctions.consultaDisplay({company_id: parseInt(req.params.company_id)})
        data.length == 0 ? res.status(200).json({msg:'No display for this company id'}) : res.status(200).json({msg:'Lista de pantalla', data})

    }catch(e){
        console.log(e)
        res.status(400).json({msg:'Error de configuracion'})   
    }
})


app.listen(PORT, () =>
  console.log('App listening on port '+ PORT)
);