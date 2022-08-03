const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: "fullstack"
  })

// GET

const getEntriesByEmail = async (email) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`
                SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
                FROM entries AS e
                INNER JOIN authors AS a
                ON e.id_author=a.id_author
                WHERE a.email=$1
                ORDER BY e.title;`,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

// const getEntriesByTitle = async (title) => {
//     let client,result;
//     try{
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query(`
//                 SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
//                 FROM entries AS e
//                 INNER JOIN authors AS a
//                 ON e.id_author=a.id_author
//                 WHERE a.title=$1
//                 ORDER BY e.title;`,[title])
//         result = data.rows
//     }catch(err){
//         console.log(err);
//         throw err;
//     }finally{
//         client.release();    
//     }
//     return result
// }

// {
//     "title": "noticia desde Node",
//     "content": "va a triunfar esto2",
//     "date": "2022-03-20T23:00:00.000Z",
//     "category": "sucesos",
//     "name": "Alejandru",
//     "surname": "Regex",
//     "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
//     },

// GET
const getAllEntries = async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`SELECT * FROM entries;`)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}


// CREATE
const createEntry = async (entry) => {
    const {title,content,email,category} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`INSERT INTO entries(title,content,id_author,category) 
                                    VALUES ($1,$2,(SELECT id_author FROM authors WHERE email=$3),$4)`
                                    ,[title,content,email,category])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}
//UPDATE
const updateEntry = async (entry) => {
    const {title,content,email,category} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`UPDATE entries 
                                         SET title=$3,content=$1,category=$2
                                        WHERE title=$3`,
                                        [content,category,title])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

// DELETE 
const deleteEntry = async (title) => {
    let client,result;
    client = await pool.connect(); // Espera a abrir conexion
    try{
        const data = await client.query(`DELETE FROM entries
                                         WHERE title=$1`,
                                        [title])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}


const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    updateEntry,
    deleteEntry
    // postEntriesByTitle
}

module.exports = entries;


// Pruebas

    // getEntriesByEmail("birja@thebridgeschool.es")
    // .then(data=>console.log(data))



// getAllEntries()
// .then(data=>console.log(data))

// 


/*
let newEntry = {
    "title":"noticia desde Node",
    "content":"va a triunfar esto2",
    "email":alejandru@thebridgeschool.es",
    "category":"sucesos"}

createEntry(newEntry)
.then(data=>console.log(data))
*/