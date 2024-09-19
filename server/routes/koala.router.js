const express = require('express');
const koalaRouter = express.Router();
// DB CONNECTION

const pool = require('../modules/pool');
// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koala_info";';
    pool.query(queryText).then(result => {
    
      res.send(result.rows);
    }) 
      .catch(error => {
        console.log('error getting koala info', error);
        res.sendStatus(500);
      });
  });


// POST
router.post('/', (req, res) => {
    let newKoala = req.body;
    console.log(`Adding Koala`, newKoala);
  

    let queryText = `INSERT INTO "koala_info" ("name", "favorite_color","age","transfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.favorite_color, newKoala.age, newKoala.transfer, newKoala.notes])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new koala`, error);
        res.sendStatus(500);
      });
  });

// PUT
router.put('/:id', (req, res) => {

    let koalaId = req.params.id;
    let transfer  = req.body.transfer;
  
    let queryText = `
    UPDATE "koala_info" SET "transfer"= NOT "transfer"
    WHERE "id"= $1;
`
    console.log("Change ready for transfer: ", koalaId, transfer)


    pool.query(queryText, [koalaId])
      .then((result) => {
        res.sendStatus(204)
      })
      .catch((err) => {
        console.log(`Error making query ${queryText}'`, err)
        res.sendStatus(500)
      })
  })

// DELETE

module.exports = koalaRouter;