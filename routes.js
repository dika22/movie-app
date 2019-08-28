'use strict';

let todoList = require('./controller/MovieController');
let todoUser = require('./controller/UserController');
let todoRental = require('./controller/RentalController');

module.exports = function(app) {

    /*Users Route*/
    /*Login app*/    
    app.route('/v1/api/appmovie/login')
        .post(todoUser.userLogin);
    /*Register User*/
    app.route('/v1/api/appmovie/adduser')
        .post(todoUser.addUser);

    /*Movie Route*/
    /*add movie*/   
    app.route('/v1/api/appmovie/addmovie')
        .post(todoList.addMovie);

    /*Rental Movie*/
    app.route('/v1/api/appmovie/rentalmovie')
        .post(todoRental.rentalMovie);       
};		