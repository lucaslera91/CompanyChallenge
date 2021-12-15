
const url1 = 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", function() {
    makeArrays()
});
//Validate input
// validamos datos de
function validate(name, company_id, latitude, longitude, type, price){
try{
    let aux = true
    if(typeof name === 'string' && name != ''){
        aux = true
    }else{
        return false
    }
    console.log(aux)

    if(typeof company_id != 'undefined' && company_id != ''){
        aux = true
    }else{
        console.log('company_id')
        return false
    }
    console.log(aux)
    
    if(typeof parseFloat(latitude) != 'string' && latitude != ''){
        aux = true
    }else{
        console.log('latitude')
        return false
    }
    console.log(aux)

    if(typeof parseInt(price) != 'string' && price != ''){
        aux = true
    }else{
        console.log('price')
        return false
    }
    console.log(aux)

    if(typeof type === 'string' && type != ''){
        aux = true
    }else{
        console.log('type')
        return false
    }
    console.log(aux)

    if(Number.isNaN(parseFloat(latitude) + parseFloat(longitude) + parseInt(price))){
        console.log('lat long')
        return false
    }else{
        console.log(Number.isNaN(parseFloat(latitude) + parseFloat(longitude) + parseInt(price)))
        return aux
    }
    

}catch(e){
    console.log(e)
    return false
}
}
// validamos tipos de datos
function typeValidate(value){
        if(value == '' || typeof value === 'string'){
            return false
        }else{
            return true
        }
}

//check if value in list of displays or companies
async function validateIfInList(value, list){
    let aux = []
    try{
        if(list == 'display'){
            //alert('in')
            const listing = await myFetch('/displays', 'GET')
            aux = transformResponseToArray(listing)
        }else{
            const listing = await myFetch('/companies', 'GET')
            aux = transformResponseToArray(listing)
        }
        console.log(aux.includes(value))
        console.log(value)
        return aux.includes(value)
    }catch(e){
        console.log(e)
        console.log('Error en validacion List')
    }
    
}

//get id from value 
async function getId(value, list){
    let aux = []


    try{
    const listCompany = await myFetch('/companies', 'GET')
        //console.log(listCompany)
        if(list == 'display'){
            const listing = await myFetch('/displays', 'GET')
            console.log(listing)
            listing.data.forEach(element => {
                if (element.name == value){
                    aux.push(element.id)
                };
            })
        }else{
            console.log(listCompany)
            listCompany.data.forEach(element => {
                if (element.name == value){
                    aux.push(element.id)
                };
            })
        }
        console.log(aux)
        return aux
    }catch(e){
        console.log(e)
        console.log('Error getting id')
    }
    
}

//transform object to array
function transformResponseToArray(res){
    const array = []
    res.data.forEach(element => {
        array.push(element.name)
    });
return array
}

//make HTML list for drop down
function makeHTMLList(array){
    let aux = ''
    array.forEach(element => {
        aux += `<option>${element}`
    });
    return aux
}

// arrays are loaded so that field has autocomplete
async function makeArrays(){
    //display
    try{
        const displayListing = await myFetch('/displays', 'GET')
        console.log(displayListing)
        const newListDisplay = transformResponseToArray(displayListing)
        const displayAutofill = document.getElementById('displayAutoFill');
        console.log(newListDisplay)
        const newHTMLDisplay = makeHTMLList(newListDisplay)
        displayAutofill.innerHTML = newHTMLDisplay
        //company
        const companyListing = await myFetch('/companies', 'GET')
        console.log(companyListing)
        const newListCompany = transformResponseToArray(companyListing)
        const companyAutofill = document.getElementById('companyAutoFill');
        console.log(newListCompany)
        const newHTMLCompany = makeHTMLList(newListCompany)
        companyAutofill.innerHTML = newHTMLCompany
    }catch(e){
        console.log(e)
        console.log("Error making Start Arrays")
        //location.reload()
    }
}

// Fetch endpoints
async function myFetch(endPoint, mType, bodyData = ''){
    //const option = { method: mType }
    const option = {
        method: mType,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    try{
        if (mType != "GET"){
            option.body = JSON.stringify(bodyData)
        }

        return (await fetch(url1 + endPoint, option)).json()
    }catch(e){
        console.log(e)
        console.log('Error en el fech - datos incorrectos')
        console.log('Datos incorrectos')
    }
   
}
