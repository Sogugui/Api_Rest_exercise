const express = require('express')


// //Rutas de productos

 const authorsApiController= require("../controllers/authorsApiController");
 const authorsApiRouter= express.Router();

 authorsApiRouter.get("/authors",authorsApiController.getAuthors)
//  authorsApiRouter.post("/entries",entriesApiController.createEntry)

// entriesApiRouter.put("/entries",entriesApiController.updateEntry)
// entriesApiRouter.delete("/entries",entriesApiController.deleteEntry)
module.exports= authorsApiRouter;
// module.exports= authorsApiRouter