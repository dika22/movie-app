let koneksi = require('../koneksi');
let rentalModel = require('../models/Rental');
let utility = require('../helper/utility');

exports.rentalMovie = function(req, res) {
    let rental = req.body;
    if (utility.isAllowed(req.body.token)) {
        let newRental = {
            'idUser'     : rental.id_user,
            'idMovie'    : rental.id_movie,
            'priceRentail' : rental.harga_rentail,
            'rentalDate' : rental.rental_date,
            'dateFinish' : utility.getDay(rental.rental_date)
        }

        let dataRental = new rentalModel(newRental);
        dataRental.save(function (err,respon) {
            if (err) return handleError(err);
                res.json({ status: 200, value: respon });
        });
    }
};

exports.userAllRentail = function(req, res) {
    rentalModel.find().exec(function(err,respon){
        res.json({status : 200, value : respon});
    })
}