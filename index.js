// javascript

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "attach link to your database"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

const endorsementInputEl = document.getElementById("endorsement-input-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-list")


publishBtn.addEventListener("click", function(){
    
    let inputValue = endorsementInputEl.value  
        
    push(endorsementListInDB, inputValue)
    
    clearEndorsementInputEl()       
})

onValue(endorsementListInDB, function(snapshot){
    
    if (snapshot.exists()){
        
        let allEndorcementArrayInDB = Object.entries(snapshot.val())
    
        clearCurrentlyDisplayedEndorcementList()
        
        for (let i = 0; i < allEndorcementArrayInDB.length; i++){
            let singleEndorcmentArrayInDB = allEndorcementArrayInDB[i]
            // let singleEndorcmentArrayID = singleEndorcmentArrayInDB[0]
            // let singleEndorcmentArrayValue = singleEndorcmentArrayInDB[1]
                    
            appendEndorcementInputToEndorementList(singleEndorcmentArrayInDB)
        }
    } else{
        endorsementListEl.innerHTML =""
    }            
})


function clearEndorsementInputEl(){
    endorsementInputEl.value  ="" 
}

function clearCurrentlyDisplayedEndorcementList(){
    endorsementListEl.innerHTML ="" 
}

function appendEndorcementInputToEndorementList(endorcement) {
    let newEndorcemntID = endorcement[0]
    let newEndorcemntValue = endorcement[1]
    
    let newEndorcemnt = document.createElement("li")
    newEndorcemnt.textContent = newEndorcemntValue
    
    newEndorcemnt.addEventListener("dblclick", function(){
        remove( ref(database, `endorsementList/${newEndorcemntID}`) )
    })
    endorsementListEl.append(newEndorcemnt)
}
   
