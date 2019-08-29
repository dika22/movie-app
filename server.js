let express = require('express'),
    app = express(),
    port = process.env.PORT || 4040,
    bodyParser = require('body-parser');
    require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./routes');
routes(app);

app.listen(process.env.PORT);
console.log('RESTful API server started on: ' + process.env.PORT);
