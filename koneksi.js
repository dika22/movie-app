var mongoose = require('mongoose');
mongoose.connect('mongodb://'+process.env.HOST+':'+process.env.PORT_DB+'/'+process.env.DB,{ useNewUrlParser: true });