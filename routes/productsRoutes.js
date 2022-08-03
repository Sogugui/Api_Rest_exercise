
const express = require('express')


//Rutas de productos

const productsController= require("../controllers/productsController");
const checkApiKey = require('../middlewares/auth_API_KEY');
const productsRouter= express.Router();

//products
productsRouter.get('/:id?',productsController.getProducts);
// productsRouter.post('/',checkApiKey,productsController.createProduct);
// productsRouter.delete("/",checkApiKey,productsController.deleteProduct);

module.exports= productsRouter;