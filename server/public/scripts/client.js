console.log( 'js' );

function getKoalas() {

  axios({
    method: 'GET',
    url: '/koalas'
  })

  .then((response) => {
    console.log("response:", response)
    let koalaData = response.data;
    console.log('This is the koala data we GET from server:', koalaData);

    renderKoalas(koalaData);
  })

  .catch((err) => {
    console.log('Error in getting data!', err);
  })

} // end of get


function deleteKoala(koalaId) {
  console.log('Koala id in client:', koalaId);

  axios({
    method: 'DELETE',
    url: `/koalas/${koalaId}`
  })

  .then((response) => {
    console.log(`${koalaId} now deleted:`, response);

    getKoalas();
  })


  .catch((err) => {
    console.log(`${koalaId} did not get deleted:`, err);
  })
}

function addKoala (event){
  event.preventDefault();
  console.log("Submit Button Clicked");
  let name = document.getElementById('nameIn').value;
  let age = document.getElementById('ageIn').value;
  let color = document.getElementById('colorIn').value;
  let readyForTransfer = document.getElementById('readyForTransferIn').value;
  let notes = document.getElementById('notesIn').value;
  console.log("Variables Match:", name, age, color, readyForTransfer,notes);

  let incomingKoala = {
    name: name,
    favorite_color: color,
    age: age,
    ready_to_transfer:readyForTransfer,
    notes: notes
  }
  saveKoala(incomingKoala)
}
function saveKoala(koala){
  console.log( 'in saveKoala' );
  // axios call to server to save koala
  axios({
    method: "POST",
      url: "/koalas",
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


// Transfer Update
function readyKoala(koala_id) {
  axios ({
    method: 'PUT',
    url: `/koalas/${koala_id}`,
    data: {status: 'true'}
  })
  .then((response) => {
    getKoalas();
  })
  .catch((error) => {
    console.log('error updating Transfer status',error)
  })
}

function renderKoalas(koalaArray){
  console.log(koalaArray)
  let ktable = document.getElementById("viewKoalas");
  ktable.innerHTML = '';
  for(let koala of koalaArray){
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
    transferButton = `<button onClick = readyKoala(${koala.id})>Ready for Transfer</button>` //transfer button only appears if not already marked
  }
  returnString = `${protoString}
  <td>${transferButton}</td> `
//returnString is now protoString, with a remove button if necessary, and a delete button
  return returnString;
}


getKoalas();
