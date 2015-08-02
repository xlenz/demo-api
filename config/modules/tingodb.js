var Db = require('tingodb')().Db;
var fs = require('fs');

var pathToDb = CONFIG.rootDir + CONFIG.pathToDb;
var db = new Db(pathToDb, {nativeObjectID: true, searchInArray: true});

if (CONFIG.recreateDb) {
  log.info('re-creating db');
  if (fs.existsSync(pathToDb + '/' + CONFIG.dbCollectionEvents))
    fs.unlinkSync(pathToDb + '/' + CONFIG.dbCollectionEvents);

  var collection = db.collection(CONFIG.dbCollectionEvents);
  var data = [];

  for (var i = 2; i <= 152; i++) {
    var lz = '0';
    if (i < 10) lz += '0';
    var key = lz + i;
    data.push({
      title: 'Some really interesting and fun event ' + key,
      location: 'Some address or location, and ' + key,
      participants: Math.floor((Math.random() * 50)),
      start: '2015-10-14T10:00:00.' + lz + i + 'Z',
      end: '2015-10-14T' + Math.floor((Math.random() * 13) + 10) + ':30:00.' + key + 'Z',
      image: 'http://lorempixel.com/256/256/nightlife/' + key
    });
  }

  collection.insert(data, {w: 1}, function (err, result) {
    if (err) return log.error(err);
    log.info('success');
  });
}

module.exports = db;
