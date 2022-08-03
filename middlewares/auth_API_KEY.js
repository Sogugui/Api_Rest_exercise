
const checkApiKey= function(req,res,next){
    if(req.query.API_KEY=="123abc"){//Ejemplo de apiKey, si no le pasamos valor se puede poner cualuiera y me va a dar como valido
      next(); //pasa a la siguiente tarea
    }
    else{
    //Mando mensaje de error
    res.status(401).send("Error. API KEY no proveida")}}

    module.exports=checkApiKey;
