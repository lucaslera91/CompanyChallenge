const createCompanyBtn = document.querySelector('#createCompanyButton')
const companyRegisterFormInsert = document.querySelector('#registerComapny')
const companySearchBtn = document.querySelector('#lookCompany')
//createCompanyBtn.addEventListener('click', addCreateCompanyForm)
const listCompanyInsert = document.querySelector('#list')
const inputSearchCompany = document.getElementById('companySearch')

document.addEventListener("DOMContentLoaded", function() {
    companySearchBtn.addEventListener('click', viewAllCompanies)

});

// Add a create form
function addCreateCompanyForm(){
    companyRegisterFormInsert.innerHTML = 
    `<div id="createCompanyForm" class="col-12 col-sm-6">
        <input id="companyNameCreate" class="form-control my-2" type="search" placeholder="Name" aria-label="Search">
        <input id="companyCountryCreate" class="form-control my-2" type="search" placeholder="Country" aria-label="Search">
    </div>
    <div class='d-flex w-100 justify-content-center'>
        <button id='submitCreateCompany' onclick='createCompany()' class="col-12 col-sm-2 btn btn-outline-success bg-light text-dark mx-3" type="submit">Submit</button>
        <button id='exitCreateCompany' onclick='exitForm()' class="col-12 col-sm-2 btn btn-outline-success bg-light text-dark mx-3" type="submit">Exit</button>
    </div>`
    const exitBtn = document.getElementById('createCompanyForm')
}

// Exit form
function exitForm(){
    companyRegisterFormInsert.innerHTML = `<div id="createCompanyButton" class="col-12 col-sm-12 d-flex justify-content-center p-3">
                                                 <button onclick='addCreateCompanyForm()' class="btn btn-outline-success bg-light my-2 my-sm-0 text-dark" type="submit">Create new company</button>
                                            </div>`
}

// view companies
async function viewAllCompanies(e){
    e.preventDefault();
    if(inputSearchCompany.value == ""){
        let list = await myFetch('/companies', 'GET');
        const {msg, data} = list
        listCompanyInsert.innerHTML = 'List of companies'
        data.forEach(element => {
            const {id, name, country} = element
            listCompanyInsert.innerHTML += `<div class='d-flex align-items-center'>
                                                ID: ${id}, name: ${name}, country: ${country}
                                                <button class="btn btn-outline-light mx-3" onclick="editCompanyBtn(this.id)" id=${id.toString()}>Edit</button>
                                                <button class="btn btn-outline-light mx-3" onclick="deleteCompany(this.id)" id="del${id}">Delete</button>
                                                <button class="btn btn-outline-light mx-3" onclick="showCompanyDisplays(this.id)" id="show${id}">Show Displays</button>
                                                </div><div id=id${id}></div><br>`;
        });
    } else{
        listCompanyInsert.innerHTML = 'Companies'
        if (await validateIfInList(inputSearchCompany.value, 'companies')){
            console.log(validateIfInList(inputSearchCompany.value, 'companies'))
            const idName = await getId(inputSearchCompany.value,'companies')
            const individualCompany = await myFetch(`/companies/${idName}`, 'GET');
            const {id, name, country} = individualCompany.data[0]
            listCompanyInsert.innerHTML += `<div class='d-flex align-items-center'> ID: ${id}, name: ${name}, country: ${country}<button class="btn btn-outline-light mx-3" onclick="editCompanyBtn(this.id)" id=${id.toString()}>Edit</button><button class="btn btn-outline-light mx-3" onclick="deleteCompany(this.id)" id="del${id}">Delete</button></div><div id=id${id}></div><br>`;
        }else{
            alert('No display with that name')
        }
    }
}

// delete id
async function deleteCompany(idName){
    //alert(idName)
    const id = idName.slice(3)
    //alert(id)
    //delete code in endpoint
    console.log(id)
    try{
        const deleteItem = await myFetch(`/companies/${id}`, 'DELETE', {id:id});
        //console.log(`${JSON.stringify(deleteItem)}`)
        console.log(deleteItem.msg)
    location.reload()

    }catch(e){
        console.log(e)
        console.log('Error en configuracion')
    }

}

//edit Company Btn

async function editCompanyBtn(id){
    const edit = document.getElementById('id'+id);
    const editBtn = document.getElementById(id)
    editBtn.style.visibility = 'hidden'
    edit.innerHTML += 
    `<div id="editDisplayForm" class="col-12 col-sm-4">
        <input id="companyNameCreate" class="form-control my-2" type="search" placeholder="Name" aria-label="Search">
        <input id="companyCountryCreate" class="form-control my-2" type="search" placeholder="Country" aria-label="Search">
    </div>
    <div>
        <button id='submitEditCompany${id}' onclick="editCompany(this.id)" class="col-10 col-sm-2 btn btn-outline-success bg-light text-dark" type="submit">Submit Edit</button>
        <button id='exitEditCompany' onclick="exitEditCompanyForm(${id})" class="col-10 col-sm-2 btn btn-outline-success bg-light text-dark m-4" type="submit">Exit edit</button>
    </div>`
const submitCompanyBtn = document.getElementById(`submitEditCompany${id}`);

}
// exitEditCompanyForm

function exitEditCompanyForm(id){
    const aux = "id"+id
    const edit = document.getElementById(aux);
    const editBtn = document.getElementById(id)
    const showBtn = document.getElementById('show'+id)
    showBtn.style.visibility = 'visible'
    editBtn.style.visibility = 'visible'
    edit.innerHTML = ''
}

// Edit company

async function editCompany(idName){
    const id = idName.slice(17)
    console.log(id)
    const name = document.getElementById('companyNameCreate')
    const country = document.getElementById('companyCountryCreate')
    //const company_id = await getId(companyName.value,'company')
    if(name.value != '' && country.value != ''){
        let update = await myFetch(`/companies/${id}`, 'PUT', {
        name: name.value,
        country: country.value,
    });
    alert('Item Modificado')
    exitEditCompanyForm(id)
    location.reload()
}    else{
    alert('Incorrect data')
}

}

//create company
async function createCompany(){
    try{
        const name = document.getElementById('companyNameCreate')
        const country = document.getElementById('companyCountryCreate')
        if(name.value != '' && country.value != ''){
            let create = await myFetch('/companies', 'POST', {
                name: name.value,
                country: country.value,
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

//show Company Displays
async function showCompanyDisplays(idName){
    const id = idName.slice(4)
    const list = await myFetch(`/companies/${id}/displays`, 'GET')
    console.log(list)
    //let displayList = transformResponseToArray(list)

    const edit = document.getElementById('id'+ id);
    const showBtn = document.getElementById('show'+id)
    showBtn.style.visibility = 'hidden'
    list.data.forEach(element => {
        edit.innerHTML += `<div class='border-bottom' id="editDisplayForm" class="col-12 col-sm-4">
                            Display <b>ID</b>: ${id}, <b>name</b>: ${element.name}, <b>company_id</b>: ${element.company_id}, <b>latitude</b>:${element.latitude}, <b>longitude</b>: ${element.longitude}, <b>type</b>: ${element.type}, <b>price</b>: $${element.price}
                            </div>`
            //listDisplay.innerHTML += `<div class='d-flex align-items-center'> ID: ${id}, name: ${name}, company_id: ${company_id}, latitude:${latitude}, longitude: ${longitude}, type: ${type}, price: $${price}<button class="btn btn-outline-light mx-3" onclick="editDisplayBtn(this.id)" id=${id.toString()}>Edit</button><button class="btn btn-outline-light mx-3" onclick="deletedisplay(this.id)" id="del${id}">Delete</button></div><div id=id${id}></div><br>`;

    });
        edit.innerHTML += 
                        `<div>
                            <button id='exitEditCompany' onclick="exitEditCompanyForm(${id})" class="col-10 col-sm-2 btn btn-outline-success bg-light text-dark m-4" type="submit">Exit displays</button>
                        </div>`
        const submitCompanyBtn = document.getElementById(`submitEditCompany${id}`);


}