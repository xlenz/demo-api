'use strict';

var bodyParser = require('body-parser');

module.exports = function (app, routes) {
  app.use(bodyParser.json());
  routes.routes(app);
  app.use(pageNotFound);
  app.use(internalServerError);
};

function pageNotFound(req, res, next) {
  res.status(404);
  return res.send({
    error: 'NOT_FOUND',
    code: 404
  });
}

function internalServerError(err, req, res, next) {
  res.status(err.status || 500);
  log.error('Internal error(%d): %s', res.statusCode, err.message);
  console.log('req.body:\n', req.body);
  return res.send({
    error: err.message,
    code: 500
  });
}
