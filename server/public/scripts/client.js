console.log( 'js' );
getKoalas();



function getKoalas() {

  axios({
    method: 'GET',
    url: '/koalas'
  })

  .then((response) => {
    let koalaData = response.data;
    console.log('This is the koala data we GET from server:', koalaData);

    displayKoalas(koalaData);
  })

  .catch((err) => {
    console.log('Error in getting data!', err);
  })

} // end of get



// HTML

function displayKoalas(data) {
  console.log('This is the data to be displayed. Is this correct?:', data);
  let viewKoalas = document.getElementById('viewKoalas');

  viewKoalas.innerHTML = '';
  for(let koala of data) {

    console.log(`Is ${koala.name} ready to transfer? ${koala.ready_to_transfer}`);
    if(koala.ready_to_transfer === true) {
      viewKoalas.innerHTML += `

      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.favorite_color}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td></td>
        <td><button onClick="deleteKoala(${koala.id})">Delete</button></td>
      </tr>`;
    
    } else {
      viewKoalas.innerHTML += `

      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.favorite_color}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td><button onClick="readyKoala(${koala.id})">Ready for Transfer</button></td>
        <td><button onClick="deleteKoala(${koala.id})">Delete</button></td>
      </tr>`;

    } 
    
  } 
} 


// DELETE 

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





function addKoala (event){
  event.preventDefault();
  console.log("Submit Button Clicked");
  let name = document.getElementById('nameIn').value;
  let age = document.getElementById('ageIn').value;
  let color = document.getElementById('colorIn').value;
  let readyForTransfer = document.getElementById('readyForTransferIn').value;
  let notes = document.getElementById('notesIn').value;
  console.log("Variables Match:", name, age, color, readyForTransfer,notes);

let incomingKoalas = {
  name: name,
  favorite_color: color,
  age: age,
  ready_to_transfer:readyForTransfer,
  notes: notes
}

  

  console.log("incomingObject:", incomingKoalas);

  

  axios({
    method: 'POST',
    url: '/koalas',
    data: incomingKoalas
  }).then(function(response) {
    console.log(response.data);
    document.getElementById('form').reset();

  }).catch(function(error) {
    console.log('error in KoalasPOST', error); 
    alert('Error adding koala object. Please try again later.')       
  });


}



