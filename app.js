let kittens = []
loadKittens()

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  if (!document.getElementById("welcome").classList.contains("hidden")){
  getStarted()
  }

  for (let i = 0;i < kittens.length; i++){
  if (kittens[i].name == form.name.value){
    console.log(`That name is already taken`)
    return
  }
  }
  
  let kitten = {
    name: form.name.value,
    mood: "tolerant",
    affection: 5,
    Id: generateId(),
  }
  kittens.push(kitten)
  saveKittens()
  form.reset()
  toggleKittenList()
  drawKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}


/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"))
  if(kittenData){
    kittens = kittenData
}

}

/**    // <i class="action fa fa-trash text-danger" onclick="clearKittens('${kitten.Id}')"></i>
 * 
 * 
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
 let kittenListElement = document.getElementById("kitten-list")
  let kittenTemplate = ""
  kittens.forEach(kitten => {
    console.log(kitten.Id)
    kittenTemplate +=`
    <div class="card mt-1 mb-1">
    <img src="${kitten.mood}-kitty.png" height="100" alt="Kitten">
    <h3 class="mt-1 mb-1">${kitten.name}</h3>
    <h3 class="mt-1 mb-1">Mood: ${kitten.mood}</h3>
    <div class="d-flex justify-content-between">
     <button onclick="pet('${kitten.Id}')">Pet kitten</button>
     <button onclick="catnip('${kitten.Id}')">Give Catnip</button>
     </div>
  </div>`
  })
  kittenListElement.innerHTML = kittenTemplate

} 


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
for (let i = 0; i < kittens.length; i++){
  if (kittens[i].Id == id){
    console.log(kittens[i].Id)
    return i
  }
}
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {

  let currentKitten = findKittenById(id)
  console.log(currentKitten)
  let rnd = Math.round(Math.random() * 10)
  if (rnd > 5) {
    kittens[currentKitten].affection++;
   } else {
    kittens[currentKitten].affection--;
}

if (kittens[currentKitten].affection <= 0) { // if affection is 0 or lower reset to 0
  kittens[currentKitten].affection = 0
}

if (kittens[currentKitten].affection >= 10) { // if affection is 10 or higher reset to 10
  kittens[currentKitten].affection = 10
}
setKittenMood(currentKitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  console.log(currentKitten)
  kittens[currentKitten].affection = 5
  setKittenMood(currentKitten)
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  
console.log(kittens[kitten].affection)
for (let i = 0;i < kittens.length; i++){
  if (kittens[i].affection >= 7){  // if its greater than 7 set mood happy
    kittens[i].mood = "happy"
  }
  else if (kittens[i].affection >= 4){ // or else check if its greater than 4 
    kittens[i].mood = "tolerant"
  } else {                 // if its not that either than the only other option is angry
    kittens[i].mood = "angry"
  }
}
saveKittens()
drawKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
 kittens = []
 console.log(kittens)
 saveKittens()
 toggleKittenList()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").classList.add("hidden")
  console.log('Good Luck, Take it away')
  document.getElementById("cat-sound").play()
  if (kittens.length == 0){
    console.log("Kittens array is empty")
    return
  } else {
    
  toggleKittenList()
}
}

function toggleKittenList() {
  if (kittens.length == 0){  // if the array is empty
    document.getElementById("kitten-list").classList.add("hidden")
  } else if(!kittens.length == 0){
   drawKittens()
  document.getElementById("kitten-list").classList.remove("hidden")
}
}

// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:sting, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

