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
    /*get id user update*/
    app.route('/v1/api/appmovie/userupdateid/:idx')
        .get(todoUser.updateUserId);
    /*update user*/    
    app.route('/v1/api/appmovie/userupdate/:idx')
        .put(todoUser.updateUser);
      

    /*Movie Route*/
    /*add movie*/   
    app.route('/v1/api/appmovie/addmovie')
        .post(todoList.addMovie);
    app.route('/v1/api/appmovie/allmovie/:token')
        .get(todoList.allMovie); 
    /*get id movie update*/
    app.route('/v1/api/appmovie/movieupdateid/:idx')
        .get(todoList.updateMovieId);
    /*update movie*/    
    app.route('/v1/api/appmovie/movieupdate/:idx')
        .put(todoList.updateMovie);
    /*delete movie*/    
    app.route('/v1/api/appmovie/deletemovie/:idx')
        .get(todoList.deleteMovie);    

    /*Rental Movie*/
    app.route('/v1/api/appmovie/rentalmovie')
        .post(todoRental.rentalMovie);   
    app.route('/v1/api/appmovie/allrentail')
        .get(todoRental.userAllRentail);     
};		