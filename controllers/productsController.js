//Controlador - Lógica de negocio de la app

//Aqui iran las funciones que tiene cada ruta. Se ponen aqui para dejar el codigo del arrchivo principal
//(app.js) limpio.
const fetch =  require("node-fetch");
const getProducts = async (req, res) => {
    if (req.params.id) {
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}
            let products = await response.json(); //{}
            res.status(200).render('products', { "products": [products] }); // Pinta datos en el pug
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).render('products', { "products": [] }); // lo ponemos aqui a esto para que si falla el fetch no me de timeout y me pinte el array vacio
           //el .status(200) es para que me devuelva ese numero de codigo de que todo ha ido bien (200) o error(404)
        }
    } else {
        try {
            let response = await fetch(`https://fakestoreapi.com/products`); // []
            let products = await response.json(); // []
            res.status(200).render('products', { products }); // Pinta datos en el pug
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            let products=[];
            res.status(404).render('products', {products});
            
        }
    }
}
// const createProduct = async (req, res) => {
//     console.log("Esto es el consol.log de lo que introducimos por postman",req.body); // Objeto recibido de producto nuevo
//     const newProduct = req.body; // {} nuevo producto a guardar
//     // Líneas
//     //para guardar 
//     // en una BBDD SQL o MongoDB
//     try {
//         let response = await fetch('https://fakestoreapi.com/products', {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newProduct)
//         })
//         let answer = await response.json(); // objeto de vuelta de la petición
//         console.log("Este es el console.log de lo que devuelve la api", answer);

//         res.status(201).send(`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`)
//     }
//     catch {
//         console.log(`ERROR: ${error.stack}`);
//         res.status(400).send(`Error guardando producto ${answer.title}`)
//     }}

//     const deleteProduct = async (req, res) => {
//         const msj = "Has enviado un DELETE para borrar product";
//         console.log(msj);
//         res.send(msj);
    // }


module.exports = {
getProducts,
//  createProduct,
// // //editProduct, cuando no quiero exportar alguna de las propiedades del objeto simplemente las comento como aca.
// deleteProduct
}


// OTRA MANERA

// const products = {
//     getProducts: async (req, res) => {
//         if (req.params.id) {
//             try {
//                 let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}
//                 let products = await response.json(); //{}
//                 res.render('products', { "products": [products] }); // Pinta datos en el pug
//             }
//             catch (error) {
//                 console.log(`ERROR: ${error.stack}`);
//             }
//         } else {
//             try {
//                 let response = await fetch(`https://fakestoreapi.com/products`); // []
//                 let products = await response.json(); // []
//                 res.render('products', { products }); // Pinta datos en el pug
//             }
//             catch (error) {
//                 console.log(`ERROR: ${error.stack}`);
//             }
//         }
//     },
//     createProduct: async (req, res) => {
//         console.log("Esto es el consol.log de lo que introducimos por postman",req.body); // Objeto recibido de producto nuevo
//         const newProduct = req.body; // {} nuevo producto a guardar
    
//         // Líneas
//         //para guardar 
//         // en una BBDD SQL o MongoDB
    
//         let response = await fetch('https://fakestoreapi.com/products', {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newProduct)
//         })
//         let answer = await response.json(); // objeto de vuelta de la petición
//         console.log("Este es el console.log de lo que devuelve la api",answer);
    
//         res.send(`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`);
//     },
//     deleteProduct: async (req, res) =>  console.log("Borrando pruducto"),
//     editProduct: async (req, res) =>  console.log("Borrando pruducto")
// }

// module.exports = products;

