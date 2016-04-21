/**
 * Created by vaio on 21.04.2016.
 */
var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var router = express.Router();



var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



require('./api/controllers/messageController')(router);
app.use('/api', router);
app.listen(config.api_port);



console.log('server started, port '+config.api_port);
