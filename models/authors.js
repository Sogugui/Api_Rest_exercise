const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: "fullstack"
  })


const getAuthorsByEmail = async () => {
  let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`
                SELECT a.id_author,a.name,a.surname,a.image
                FROM authors AS a
                WHERE a.email=$1
                ORDER BY a.name;`,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result}

// const geTAuthorsByName = async (name) => {
//     let client,result;
//     try{
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query(`
//                 SELECT a.id_author,a.name,a.surname,a.email,a.name,a.surname,a.image, e.content
//                 FROM authors AS a
//                 INNER JOIN entries AS e
//                 ON a.id_author=e.id_author
//                 WHERE a.name=$1
//                 ORDER BY a.id_author;`,[name])
//         result = data.rows
//     }catch(err){
//         console.log(err);
//         throw err;
//     }finally{
//         client.release();    
//     }
//     return result
// }
