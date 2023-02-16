const cardsContainer = document.querySelector(".cards-container")
const spinner = document.querySelector(".spinner")
const darkMode = document.querySelector("#dark-mode")
const search = document.querySelector("#inputSearch")

const api = 'https://restcountries.com/v3.1/all'

let drk = false 
let darkM = localStorage.getItem('darkmode') ? JSON.parse(localStorage.getItem('darkmode')) : []


if(darkM){
    if(drk){
        document.body.classList.remove("dark-mode")
        drk = false
        localStorage.setItem('darkmode', drk)
    }else{
        document.body.classList.add("dark-mode")
        drk = true
        localStorage.setItem('darkmode', drk)
    }
    
}


const request = new XMLHttpRequest()
let countryArray 

request.addEventListener("readystatechange" , ()=>{
    if(request.readyState == 4 && request.status == 200){
        countryArray = JSON.parse(request.responseText)
        spinner.classList.add("hidden")
        countryArray.forEach((counrty) =>{
            creatCountry(counrty)
        })
    }
})

request.open('GET',  api)
request.send()





darkMode.addEventListener("click", ()=> { 
    if(drk){
        document.body.classList.remove("dark-mode")
        drk = false
        localStorage.setItem('darkmode', drk)
    }else{
        document.body.classList.add("dark-mode")
        drk = true
        localStorage.setItem('darkmode', drk)
    }
    
})

function creatCountry(obj){
    const {capital, flags, name, region, population } = obj
    const div = document.createElement('div')
    div.classList.add("card")
    cardsContainer.appendChild(div)
     
    div.innerHTML = `
    <img src="${flags.svg}" class="card-img" alt="${name.common}" />
    <div class="card-body">
        <h5 class="card-title">${name.common}</h5>
        <p><b>Population: </b> ${population}</p>
        <p><b>Region: </b>${region}</p>
        <p><b>Capital: </b>${capital ? capital : 'No Capital'}</p>
    </div>
    `
}


search.addEventListener("input", ()=> {
    countryArray = JSON.parse(request.responseText)
    let newArr = countryArray.filter((counrty) =>{
        const common = (counrty.name.common).toLowerCase()

        if(common.includes(search.value)){
            return common
        }else{
            console.log('Not country')
        }

        // return common == search.value ? common : 'Not common'
    })
    cardsContainer.innerHTML = ""
    newArr.forEach((country)=>{
        creatCountry(country)
    })
    console.log(newArr)
    
})






