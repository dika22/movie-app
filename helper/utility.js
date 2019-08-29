let moment = require('moment');
let userModel = require('../models/Users');
let bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports.getDay = function(date) {
    let startdate = moment(date,'DD-MM-YYYY');
	startdate.add(7, "days");
	let nextDate = moment(startdate).format("DD-MM-YYYY");

    return nextDate;
};

module.exports.validateEmail = function(email) {
    let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(email)) {
    	return email;
    }else{
    	return res.json({ status: 404, message: 'Email Tidak valid'  });	
    }
    
};


module.exports.login = function(username, pwd)  {
    return new Promise(async function(resolve, reject) {
        try {
            let query = { $or: [{ username: username }, { handphone: username }] }
            userModel.findOne(query)
                .then((res) => {
                    if (res !== null) {
                        let isMatch = bcrypt.compareSync(pwd, res.password);
                        if (isMatch) {
                            let token = jwt.sign({
                                email: res.email,
                                id: res._id,
                            }, process.env.JWT_TOKEN_SECRET, {
                                expiresIn: parseInt(process.env.JWT_TOKEN_VALIDITY) // exampe expire after 1 year
                            })
                            res.tn = token;
                            res.save()

                            let data = Object.assign({}, res._doc)
                            data.token = token
                            resolve(data)
                        } else {
                            throw new Error('Passwords dont match.')
                        }
                    } else {
                        throw new Error('Username Not Found')
                    }
                })
        } catch (e) {
         	console.log("baru Masuk sini dlu", e)
            reject({
                code: 401,
                message: e.message
            })  
        }
    })
}

module.exports.isAllowed = function(token) {
     try {
        return jwt.verify(token, process.env.JWT_TOKEN_SECRET, function(err, decoded) {
            if (err) {
                throw new Error('Token not valid')
            }
            return decoded;
        })

    } catch (err) {
        throw new Error('Token not valid')
    }
}