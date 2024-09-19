const express = require('express');
const koalaRouter = express.Router();
// DB CONNECTION

const pool = require('../modules/pool');
// GET
koalaRouter.get('/', (req, res) => {
  console.log("request:", req)
    let queryText = 'SELECT * FROM "koalas";';
    pool.query(queryText).then(result => {
      console.log("sending:", result.rows)
      res.send(result.rows);
    }) 
      .catch(error => {
        console.log('error getting koala info', error);
        res.sendStatus(500);
      });
  });


// POST
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;
    console.log(`Adding Koala`, newKoala);
  

    let queryText = `INSERT INTO "koalas" ("name", "favorite_color","age","ready_to_transfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.favorite_color, newKoala.age, newKoala.ready_to_transfer, newKoala.notes])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new koala`, error);
        res.sendStatus(500);
      });
  });

// PUT
koalaRouter.put('/:id', (req, res) => {

    let koalaId = req.params.id;
  
    let queryText = `
    UPDATE "koalas" SET "ready_to_transfer"= true
    WHERE "id"= $1;
`
    console.log("marked ready for transfer: ", koalaId,)


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
//stretch goal


module.exports = koalaRouter;