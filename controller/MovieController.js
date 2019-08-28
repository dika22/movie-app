let koneksi = require('../koneksi');
let movieModel = require('../models/Movies');

exports.addMovie = function(req, res) {
    let movie = req.body;
    let newMovie = {
        'title'     : movie.title,
        'category'  : movie.category,
        'description': movie.description 
    }

    let dataMovie = new movieModel(newMovie);
    dataMovie.save(function (err,respon) {
        if (err) return handleError(err);
            res.json({ status: 200, value: respon });
     });
};

exports.updateMovie = function(req, res) {
    let id = req.params;
    movieModel.findOneAndUpdate({_id : id}).exec(function(err,res){
        
    })
};

exports.deleteMovie = function(req, res) {
    let id = req.params;
    movieModel.deleteOne({_id : id}).exec(function(err,res){
        res.json({status : 200, message : 'Data movie berhasil dihapus'});
    })
};