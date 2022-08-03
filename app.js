
//Modulos externos (Siempre primero) 
const express = require('express')
const emoji = require('emoji-whale');
const cowsay = require('cowsay2');
const owl = require('cowsay2/cows/owl');
const whale = require('cowsay2/cows/whale');


//Rutas de productos
const productsRoutes= require("./routes/productsRoutes");
const productsApiRoutes = require('./routes/productsApiRoutes');
const entriesApiRoutes= require("./routes/entriesApiRoutes")
const authorsApiRoutes = require('./routes/authorsApiRoutes');

//Tus propios modulos
const calc=require("./utils/calculator.js");
const { render } = require('pug');
console.log(calc.add(10,100));

//Middleware error
const manage404= require('./middlewares/error404');


const checkApiKey = require('./middlewares/auth_API_KEY');


const app = express()
const port = 3000

//View engine
app.set('view engine', 'pug');
app.set('views','./views');

// Permite leer el body recibido en una petición
app.use(express.json());

//Middleware de acceso a TODAS las rutas
// app.use(checkApiKey);

//Middleware de acceso a las rutas de products
// app.use("/products",checkApiKey,productsRoutes)

//Router de productos. Esto es el prefijo para todas las rutas. Despues de esta ruta nos fijamos en productsRoutes

 //WEB
app.use("/products",productsRoutes)
// app.use("/entries",entriesRoutes)

//API
app.use("/api/products",productsApiRoutes)
app.use("/api",entriesApiRoutes)
app.use("/api",authorsApiRoutes)

// WEB
// http://localhost:3000/products GET
// http://localhost:3000/products/4 GET

// API
// http://localhost:3000/api/products GET
// http://localhost:3000/api/products/4 GET
// http://localhost:3000/api/products POST
// http://localhost:3000/api/products DELETE


// HOME
// http://127.0.0.1:3000
// http://localhost:3000
app.get('/', (req, res) => {
    console.log(emoji)
    console.log(cowsay.say('Hola que tal?', { cow: owl }));
    // res.send('Hola desde mi primer servidor!!!!'+ emoji)
    let msj= "Hola desde mi primer servidor :)"+ emoji;
    res.render("my_view.pug",{section:"home",msj});// Lo que esta entre llaves seria como el "hueco" a rellenar de la plantilla html, por lo que le pasamos con lo que queremos rellenar
})

// http://localhost:3000/pokemon/charmander
// http://localhost:3000/pokemon/mew
// http://localhost:3000/pokemon/pikachu
// http://localhost:3000/pokemon/snorlax
app.get('/pokemon/:name?', (req, res) => {
    console.log(req.params);
    msj="";
    if (req.params.name) {
        msj='Aquí te envío a:' + req.params.name
    } else {
        msj='Aquí te envío a todos los pokemon del planeta'
    }
    console.log(console.log(cowsay.say(msj, { cow: owl })))//imprime el buho con msj
    // res.send(msj+" "+emoji)
    res.render("my_view",{section:"Seccion Pokemon",msj})
})

app.get('/perritos', (req, res) => {
    let msj= "Cuánto es 2+2:?"+ calc.add(2,2)
    console.log(cowsay.say(msj, { cow: owl }))
    res.send('Aquí te enviaría mis perritos y... '+ msj+" "+ emoji)
})

app.use(manage404)// tiene que estar ultimo para que analice todas las rutas anteriores y si no es ninguna, que use la de middleware

app.listen(port, () => {
    console.log(`Mi servidor funciona en el puerto ${port}`)
    console.log(console.log(cowsay.say(`Mi servidor funciona en el puerto http://localhost:${port}`, { cow: whale })))
    
})



