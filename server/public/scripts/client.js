console.log( 'js' );
//TODO: REMOVE THIS IS ONLY FOR TESTING WITHOUT BACKEND
/*let koalaArray = [
      {
        "id" : 1,
        "name" : "Scotty",
        "favorite_color" : "Red",
        "age" : 4,
        "ready_to_transfer" : true,
        "notes" : "Born in Guatemala"
      },
      {
        "id" : 2,
        "name" : "Jean",
        "favorite_color" : "Green",
        "age" : 5,
        "ready_to_transfer" : true,
        "notes" : "Allergic to lots of lava"
      },
      {
        "id" : 3,
        "name" : "Ororo",
        "favorite_color" : "Yellow",
        "age" : 7,
        "ready_to_transfer" : false,
        "notes" : "Loves listening to Paula (Abdul)"
      },
      {
        "id" : 4,
        "name" : "K'Leaf",
        "favorite_color" : "Purple",
        "age" : 15,
        "ready_to_transfer" : false,
        "notes" : "Never refuses a treat."
      },
      {
        "id" : 5,
        "name" : "Charlie",
        "favorite_color" : "Orange",
        "age" : 9,
        "ready_to_transfer" : true,
        "notes" : "Favorite band is Nirvana"
      },
      {
        "id" : 6,
        "name" : "Betsy",
        "favorite_color" : "Blue",
        "age" : 4,
        "ready_to_transfer" : true,
        "notes" : "Has a pet iguana"
      }
]
*/
//TODO: remove above

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas

  axios({
    method: "GET",
    url: "/koalas",
  })
  .then(function (response) {
    console.log("got koalas:", response.data);
    renderKoalas(response.data);
  })
  .catch(function (error) {
      console.log("error getting koalas", error);
      alert('error getting koalas! check console');
  })
  //renderKoalas(koalaArray); //TODO: remove when working with router
} // end getKoalas

function submitKoala(event){
  event.preventDefault();
  console.log('koala submit button clicked')
  let koala = {}
    koala.name = document.getElementById("nameIn").value;
    koala.favorite_color = document.getElementById("colorIn").value;
    koala.age = document.getElementById("ageIn").value;
    koala.ready_to_transfer = document.getElementById("readyForTransferIn").value;
    koala.notes = document.getElementById("notesIn").value;
  saveKoala(koala)
}


function saveKoala(koala){
  console.log( 'in saveKoala' );
  // axios call to server to get koalas
  axios({
    method: "POST",
    url: "/koalas/add",
    data: koala,
  })
  .then(function (response) {
    console.log("saveKoala()", response.data);
    getKoalas();
  })
  .catch(function (error) {
    console.log("Error in POST", error);
    alert("Unable to save koala")
  });
}

function renderKoalas(koalaArray){
  let ktable = document.getElementById("viewKoalas");
  ktable.innerHTML = '';
  for(koala of koalaArray){
    ktable.innerHTML += buildRow(koala)
  }
}

function buildRow(koala){
    let protoString = `
    <td>${koala.name}</td>
    <td>${koala.favorite_color}</td>
    <td>${koala.age}</td>
    <td>${koala.ready_to_transfer}</td>
    <td>${koala.notes}</td>
  `
  return processTransfer(koala, protoString)
}

function processTransfer(koala, protoString){
  let returnString;
  let transferButton = ''
  if(!(koala.ready_to_transfer)){ 
    transferButton = `<button onClick = markReady(${koala.id})>Ready for Transfer</button>` //transfer button only appears if not already marked
  }
  let deleteButton = `<button onClick = deleteKoala(${koala.id})>Delete</button>`
  returnString = `${protoString}
  <td>${transferButton}</td> 
  <td>${deleteButton}</td>`
//returnString is now protoString, with a remove button if necessary, and a delete button
  return returnString;
}

getKoalas();
