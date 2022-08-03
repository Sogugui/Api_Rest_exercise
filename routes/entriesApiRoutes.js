//GET http://localhost:3000/entries -> ALL
//GET http://localhost:3000/entries?email=hola@gmail.com -> por email
// POST http://localhost:300/entries 

// podemos usar la misma ruta para get y para post porque son operaciones distintas

const express = require('express')


//Rutas de productos

const entriesApiController= require("../controllers/entriesApiController");
const entriesApiRouter= express.Router();

entriesApiRouter.get("/entries",entriesApiController.getEntries)
entriesApiRouter.post("/entries",entriesApiController.createEntry)
entriesApiRouter.put("/entries",entriesApiController.updateEntry)
entriesApiRouter.delete("/entries",entriesApiController.deleteEntry)
module.exports= entriesApiRouter