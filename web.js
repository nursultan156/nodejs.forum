/**
 * Created by vaio on 21.04.2016.
 */
var config = require('./config');
var express = require('express');
var app = express();


app.get('/apiport', function (req, res) {
    res.send({port:config.api_port});
});
app.use(express.static(__dirname + '/web'));

app.listen(config.web_port);



console.log('web started, port ' + config.web_port);