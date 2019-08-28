const mongoose = require('mongoose'); 

const schemaOption = {
    collection: "movies"
}

let MovieSchema = new mongoose.Schema({  
  	title: String,
  	category: String,
  	description: String
},schemaOption);
let Movies = mongoose.model('Movies',MovieSchema);
module.exports = Movies;