//Middleware ERROR 404
const manage404= function (req,res,next){
    res.status(404).send('Error! 404 not found :) ');
};// PAra pasar una respuesta por defecto cuando el usuario pone una ruta que no existe
module.exports = manage404;