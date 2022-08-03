//GET http://localhost:3000/entries -> ALL
//GET http://localhost:3000/entries?email=hola@gmail.com -> por email

const entry = require("../models/entry")
//getEntries()
const getEntries= async (req,res)=>{
    let entries;
if(req.query.email){
  entries = await entry.getEntriesByEmail(req.query.email)
}else{
    entries = await entry.getAllEntries()
}
res.status(200).json(entries); // array [] con las entries encontradas
}

// {
//     "title":"noticia desde Node",
//     "content":"va a triunfar esto2",
//     "email":"alejandru@thebridgeschool.es",
//     "category":"sucesos"} ********************Objeto a probar en el post
//createEntry()

//crear entry por email
// const createEntry= async (req,res)=>{
// const newEntry=req.body; // la peticion llega y la leo a traves del body
// const response = await entry.createEntry(newEntry) // se guarda una entrada en la BBDD
// res.status(201).json({   // 201 es para decir ok,creado
//     "items_created":response,
//     data:newEntry
// });

// }

const createEntry = async(req,res) =>{
    try {
        const newEntry = req.body;
        const response = await entry.createEntry(newEntry)
        res.status(201).json({"saved": response})
    } catch (error) {
        console.log(error);
        res.status(400).json('error_detail:' + error.detail, 'error_code:' + error.code)
    }
}

const updateEntry = async(req,res) =>{
    try {
        const newEntry = req.body;
        if(req.body.title){
            const response = await entry.updateEntry(newEntry)
            res.status(200).json({"updated": response})}
        else{res.status(400).json({"message":"petición mal formada"})}
    } catch (error) {
        console.log(error);
        res.status(400).json('error_detail:' + error.detail, 'error_code:' + error.code)
    }
}

const deleteEntry = async(req,res) =>{
    try {
        if(req.body.title){
            const response = await entry.deleteEntry(req.body.title)
            res.status(200).json({"deleted": response})}
        else{res.status(400).json({"message":"petición no borrada"})}
    } catch (error) {
        console.log(error);
        res.status(400).json('error_detail:' + error.detail, 'error_code:' + error.code)
    }
}


module.exports={
    getEntries,
    createEntry,
    updateEntry, //PUT
    deleteEntry// DELETE
}