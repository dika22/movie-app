const mongoose = require('mongoose'); 

const schemaOption = {
    collection: "rentals"
}

let RentalSchema = new mongoose.Schema({  
  	idUser: String,
  	idMovie: String,
  	priceRentail : String,
  	rentalDate: String,
  	dateFinish : String
},schemaOption);

let Rental = mongoose.model('Rental',RentalSchema);
module.exports = Rental;