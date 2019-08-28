var mongoose = require('mongoose'); 

const schemaOption = {
    collection: "users"
}

var UserSchema = new mongoose.Schema({  
  	name     : String,
  	email    : String,
  	password : String,
  	handphone: String
},schemaOption);

let Users = mongoose.model('Users',UserSchema);
module.exports = Users;