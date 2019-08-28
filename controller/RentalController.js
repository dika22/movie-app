let koneksi = require('../koneksi');
let rentalModel = require('../models/Rental');

exports.rentalMovie = function(req, res) {
    let rental = req.body;
    let newRental = {
        'idUser'     : rental.id_user,
        'idMovie'    : rental.id_movie,
        'rentalDate' : rental.rental_date,
        // 'dateFinish' : 
    }

    let dataRental = new rentalModel(newRental);
    dataRental.save(function (err,respon) {
        if (err) return handleError(err);
            res.json({ status: 200, value: respon });
     });
};