const createDisplayBtn = document.querySelector('#createDisplayButton')
const displayRegisterFormInsert = document.querySelector('#registerDisplay')
const listDisplay = document.querySelector('#list')
const displaySearch = document.querySelector('#lookDisplay')
const displaySearchInput = document.querySelector('#displaySearch')
const countrySearchInput = document.querySelector('#displayCountrySearch')
document.addEventListener("DOMContentLoaded", function() {
    //createDisplayBtn.addEventListener('click', addCreateDisplayForm)
    displaySearch.addEventListener('click', viewDisplays)
});

//Create display Form
function addCreateDisplayForm(){
   
    displayRegisterFormInsert.innerHTML = 
    `<div id="createDisplayForm" class="col-12 col-sm-6">
    <input id="displayNameCreate" class="form-control my-2" type="search" placeholder="Name" aria-label="Search">
    <input id="displayCompanyIDCreate" class="form-control my-2" type="search" placeholder="Company Name" aria-label="Search">
    <input id="displayLatitudeCreate" class="form-control my-2" type="search" placeholder="Latitude" aria-label="Search">
    <input id="displayLongitudeCreate" class="form-control my-2" type="search" placeholder="Longitude" aria-label="Search">

    <select id="displayTypeCreate" name="select" class="form-control my-2" type="search" placeholder="Indoor/Outdoor" aria-label="Search">
        <option value="Indoor">Indoor</option>
        <option value="Outdoor" selected>Outdoor</option>
    </select>

    <input id="displayPriceCreate" class="form-control my-2" type="search" placeholder="Price" aria-label="Search">
</div>
<div class="d-flex justify-content-center w-100">
    <button  id='submitCreateDisplay' class="col-12 col-sm-2 btn btn-outline-success bg-light mx-2 text-dark" type="submit">Submit</button>
    <button onclick="extitFormDisplay()" id='exitDisplay' class="col-12 col-sm-2 btn btn-outline-success bg-light mx-2 text-dark">Exit</button>
</div>`
//<input id="displayTypeCreate" class="form-control my-2" type="search" placeholder="Indoor/Outdoor" aria-label="Search">

const submitDisplayBtn = document.getElementById('submitCreateDisplay');
submitDisplayBtn.addEventListener('click', createDisplay)
}
// exit form create display
function extitFormDisplay(){
    displayRegisterFormInsert.innerHTML = `
        <div id="createDisplayButton" onclick="addCreateDisplayForm()"class="col-12 col-sm-12 d-flex justify-content-center p-3">
            <button class="btn btn-outline-success bg-light my-2 my-sm-0 text-dark" type="submit">Create new display</button>
        </div>`
}
//Create the Display
async function createDisplay(e){
    e.preventDefault()
    try{
        const name = document.getElementById('displayNameCreate')
        const latitude = document.getElementById('displayLatitudeCreate')
        const longitude = document.getElementById('displayLongitudeCreate')
        const type = document.getElementById('displayTypeCreate')
        const companyName = document.getElementById('displayCompanyIDCreate')
        console.log(companyName.value)
        const company_id = await getId(companyName.value,'company')
        const price = document.getElementById('displayPriceCreate')
    
        console.log(company_id[0])
        
        if(validate(name.value, company_id[0],latitude.value, longitude.value, type.value, price.value)){
            console.log(validate(name.value, company_id[0],latitude.value, longitude.value, type.value, price.value))
            let create = await myFetch('/displays', 'POST', {
                name: name.value,
                company_id: company_id[0],
                latitude: latitude.value,
                longitude: longitude.value,
                type: type.value,
                price: price.value
            });
       
            displayRegisterFormInsert.innerHTML = ` <div id="createDisplayButton" class="col-12 col-sm-12 d-flex justify-content-center p-3">
                                                        <button class="btn btn-outline-success bg-light my-2 my-sm-0 text-dark" type="submit">Create new display</button>
                                                    </div>`
           alert('Display created')
           location.reload()
        }else{
            alert('Some data not correct')
        }
    
    }catch(e){
        console.log(e)
        alert('Error en los datos')
    }
    
    
}

// mostramos todos los valores de display
async function viewDisplays (e){
    e.preventDefault();
    //if campo country '' then esto:
    if(countrySearchInput.value == ''){
        if(displaySearchInput.value == ""){
            let list = await myFetch('/displays', 'GET');
            const {msg, data} = list
            listDisplay.innerHTML = 'List of displays'
            data.forEach(element => {
                const {id, name, company_id, latitude, longitude, type, price} = element
                listDisplay.innerHTML += `<div class='d-flex align-items-center'> ID: ${id}, name: ${name}, company_id: ${company_id}, latitude:${latitude}, longitude: ${longitude}, type: ${type}, price: $${price}<button class="btn btn-outline-light mx-3" onclick="editDisplayBtn(this.id)" id=${id.toString()}>Edit</button><button class="btn btn-outline-light mx-3" onclick="deletedisplay(this.id)" id="del${id}">Delete</button></div><div id=id${id}></div><br>`;
            });
        } else{
            listDisplay.innerHTML = 'Display'
            if (await validateIfInList(displaySearchInput.value, 'display')){
                console.log(validateIfInList(displaySearchInput.value, 'display'))
                const idName = await getId(displaySearchInput.value,'display')
                const individualDisplay = await myFetch(`/displays/${idName}`, 'GET');
                //console.log('this ' + individualDisplay.data[0])
                const {id, name, company_id, latitude, longitude, type, price} = individualDisplay.data[0]
                listDisplay.innerHTML += `<div class='d-flex align-items-center'> ID: ${id}, name: ${name}, company_id: ${company_id}, latitude:${latitude}, longitude: ${longitude}, type: ${type}, price: $${price}<button class="btn btn-outline-light mx-3" onclick="editDisplayBtn(this.id)" id=${id.toString()}>Edit</button><button class="btn btn-outline-light mx-3" onclick="deletedisplay(this.id)" id="del${id}">Delete</button></div><div id=id${id}></div><br>`;
            }else{
                alert('No display with that name')
            }

        }
    }else{
        //else ejecutar la busqueda de /displays?country={campo country}
        let list = await myFetch(`/displays?country=${countrySearchInput.value}`, 'GET');
            const {msg, search} = list
            listDisplay.innerHTML = 'List of displays'
            if (search.length == 0){
            listDisplay.innerHTML += '<br>No results found'
            }else{
                search.forEach(element => {
                    const {id, name, company_id, latitude, longitude, type, price, country} = element
                    listDisplay.innerHTML += `<div class='d-flex align-items-center'> ID: ${id}, name: ${name}, company_id: ${company_id}, latitude:${latitude}, longitude: ${longitude}, type: ${type}, price: $${price}, country: ${country}<button class="btn btn-outline-light mx-3" onclick="editDisplayBtn(this.id)" id=${id.toString()}>Edit</button><button class="btn btn-outline-light mx-3" onclick="deletedisplay(this.id)" id="del${id}">Delete</button></div><div id=id${id}></div><br>`;
                })
            }
        

    }
}

// funciones del button edit
async function editDisplayBtn(id){
    const edit = document.getElementById('id'+id);
    const editBtn = document.getElementById(id)
    editBtn.style.visibility = 'hidden'
    edit.innerHTML += 
    `<div id="editDisplayForm" class="col-12 col-sm-6">
    <input id="displayNameCreate" class="form-control my-2" type="search" placeholder="Name" aria-label="Search">
    <input id="displayCompanyIDCreate" class="form-control my-2" type="search" placeholder="Company Name" aria-label="Search">
    <input id="displayLatitudeCreate" class="form-control my-2" type="search" placeholder="Latitude" aria-label="Search">
    <input id="displayLongitudeCreate" class="form-control my-2" type="search" placeholder="Longitude" aria-label="Search">
    <input id="displayTypeCreate" class="form-control my-2" type="search" placeholder="Indoor/Outdoor" aria-label="Search">
    <input id="displayPriceCreate" class="form-control my-2" type="search" placeholder="Price" aria-label="Search">
</div>
<div>
    <button id='submitEdit${id}' onclick="editDisplay(this.id)" class="col-12 col-sm-2 btn btn-outline-success bg-light text-dark" type="submit">Submit Edit</button>
    <button id='exitEditDisplay' onclick="exitEditDisplayForm(${id})" class="col-12 col-sm-2 btn btn-outline-success bg-light text-dark m-4" type="submit">Exit edit</button>
</div>`
const submitDisplayBtn = document.getElementById(`submitEdit${id}`);
}
    
//exit edit form
function exitEditDisplayForm(id){
    
    const aux = "id"+id
    console.log(aux)

    const edit = document.getElementById(aux);
    console.log(aux)
    const editBtn = document.getElementById(id)
    editBtn.style.visibility = 'visible'
    edit.innerHTML = ''
}

// edit genera un form para poder cambiar datos
async function editDisplay(idName){
    const id = idName.slice(10)
    console.log(id)
    const name = document.getElementById('displayNameCreate')
    const latitude = document.getElementById('displayLatitudeCreate')
    const longitude = document.getElementById('displayLongitudeCreate')
    const type = document.getElementById('displayTypeCreate')
    const companyName = document.getElementById('displayCompanyIDCreate')
    const company_id = await getId(companyName.value,'company')
    const display_id = await getId(name.value,'display')
    const price = document.getElementById('displayPriceCreate')
    if(validate(name.value, company_id[0],latitude.value, longitude.value, type.value, price.value)){
        console.log(validate(name.value, company_id[0],latitude.value, longitude.value, type.value, price.value))
    
        let update = await myFetch(`/displays/${id}`, 'PUT', {
        name: name.value,
        company_id: company_id[0],
        latitude: latitude.value,
        longitude: longitude.value,
        type: type.value,
        price: price.value
    });
    alert('Item Modificado')
    const edit = document.getElementById('id'+id);
    edit.innerHTML = ''
}    else{
    alert('Incorrect data')
}

}

// eliminamos el display
async function deletedisplay(idName){
    //alert(idName)
    const id = idName.slice(3)
    //alert(id)
    //delete code in endpoint
    console.log(id)
    try{
        let deleteItem = await myFetch(`/displays/${id}`, 'DELETE', {id:id});
        console.log(`${JSON.stringify(deleteItem)}`)
        console.log(deleteItem.msg)
    location.reload()

    }catch(e){
        console.log(e)
        console.log('Error en configuracion')
    }

}