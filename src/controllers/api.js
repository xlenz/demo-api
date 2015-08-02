'use strict';

var self = this;
var db = null;

module.exports = function (_db) {
  db = _db;
  return self;
};

exports.hello = function (req, res, next) {
  return res.send(
    'GET: /events - returns events json list for home page\n<br>' +
    'GET: /event/:eventId - returns event by id\n<br>' +
    'POST: /events/find - returns events json list for search page [NOT IMPLEMENTED]\n<br>' +
    'GET: /user/me - returns user page details [NOT IMPLEMENTED]\n<br>' +
    '...'
  );
};

exports.getEvents = function (req, res, next) {
  try {
    var eventsCollection = db.collection(CONFIG.dbCollectionEvents);
    eventsCollection.find(function (err, cursor) { //empty array in case of no events
      if (err) return next(new Error(err));
      cursor.toArray(function (err, events) {
        if (err) return next(new Error(err));
        res.send(events);
      });
    });
  } catch (exception) {
    return next(exception);
  }
};

exports.getEventById = function (req, res, next) {
  try {
    if (!req.params.eventId) return next(new Error('No event id provided.'));
    var eventsCollection = db.collection(CONFIG.dbCollectionEvents);
    eventsCollection.findOne({_id: req.params.eventId}, function (err, event) {
      if (err) return next(new Error(err));
      if (event === null) return next(new Error('No event found by id: ' + req.params.eventId));
      res.send(event);
    });
  } catch (exception) {
    return next(exception);
  }
};
