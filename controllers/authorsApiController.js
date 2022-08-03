 const authors = require("../models/authors")

 const getAuthors = async (req, res) => {
    try {
        let authors;
        if(req.query.email){
            authors = await authors.getAuthorsByEmail(req.query.email);
        }
        else {
            authors = await authors.getAllAuthors();
        }

        res.status(200).json(authors);

    } catch (error) {
        console.log(error)
        res.status(404).json("not found!")
    }
}

module.exports={
    getAuthors,
}