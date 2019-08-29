let koneksi = require('../koneksi');
let userModel = require('../models/Users');
let bcrypt = require('bcryptjs');
const saltRounds = 10;
let utility = require('../helper/utility');

exports.addUser = function(req, res) {
    let user = req.body;

    userModel.findOne({username : user.username}).exec(function(err,respon){
        if (respon !== null) {
            return res.json({ status: 404, message: 'User Sudah terdaftar'});   
        }else{
            let newUser = {
                'username' : user.username,
                'password' : bcrypt.hashSync(user.password, saltRounds),
                'email'    : utility.validateEmail(user.email),
                'handphone': user.handphone 
            }
            
            let dataUser = new userModel(newUser);
            dataUser.save(function (err,respon) {
              if (err) return handleError(err);
                res.json({ status: 200, value: respon });
            });
        }   
    });
    
};

exports.updateUserId = function(req, res) {
    let id = req.params.idx;

    userModel.findOne({_id : id}).exec(function(err,respon){
        res.json({status : 200, message : respon})
    })
};

exports.updateUser = function(req, res) {
    let id = req.params.idx;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let handphone = req.body.handphone;
    userModel.findOneAndUpdate({_id : id},{
        'username' : username,
        'password' : password,
        'email' : email,
        'handphone' : handphone
    }).exec(function(err,respon){
        res.json({status : 200, message : 'Data User berhasil diupdate'});
    })
};

exports.userLogin = async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let user = await utility.login(username, password);

    if (user) {
        res.json({status : 200, token : user.token });
    }
};