'use strict';

var self = this;
var api;

module.exports = function (db) {
  api = require('./controllers/api')(db);
  return self;
};

exports.routes = function (app) {
  app.get('/', api.hello);
  app.get('/events', api.getEvents);
  app.get('/event/:eventId', api.getEventById);
};
