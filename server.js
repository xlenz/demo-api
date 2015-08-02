'use strict';

//logging
global.log = require('./config/modules/winston');

//reading config file
global.CONFIG = require('./config/config')();
CONFIG.rootDir = __dirname + '/';

//tingodb
var db = require('./config/modules/tingodb');

//express
var express = require('express');
var app = express();

//routes
var routes = require('./src/routes')(db);

//setup express usages
require('./config/modules/express')(app, routes);

//start server
app.listen(CONFIG.port, CONFIG.host, function () {
  var host = CONFIG.host || '*';
  var port = CONFIG.port || 'default';
  log.info('Listening - ' + host + ':' + port);
});
