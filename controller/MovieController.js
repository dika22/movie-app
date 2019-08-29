let koneksi = require('../koneksi');
let movieModel = require('../models/Movies');
let utility = require('../helper/utility');


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

exports.updateMovieId = function(req, res) {
    let id = req.params.idx;

    movieModel.findOne({_id : id}).exec(function(err,respon){
        res.json({status : 200, message : respon})
    })
};

exports.updateMovie = function(req, res) {
    let id = req.params.idx;
    let title = req.body.title;
    let category = req.body.category;
    let description = req.body.description;
    movieModel.findOneAndUpdate({_id : id},{
        'title' : title,
        'category' : category,
        'description' : description
    }).exec(function(err,respon){
        res.json({status : 200, message : 'Data movie berhasil diupdate'});
    })
};

exports.deleteMovie = function(req, res) {
    let id = req.params.idx;
    movieModel.deleteOne({_id : id}).exec(function(err,respon){
        res.json({status : 200, message : 'Data movie berhasil dihapus'});
    })
};

exports.allMovie = function(req, res) {
    if (utility.isAllowed(req.params.token)) {
        movieModel.find().exec(function(err,respon){
            res.json({status : 200, token : respon});
        })
    }
};