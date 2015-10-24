/*global define*/
'use strict';

define([
  'pouchdb',
  "pouchdb-find"
], function (PouchDB) {
  var moduleName = 'storage.service';

  angular.module(moduleName, [
  ]).factory('storageService', function ($http, $q) {

    PouchDB.plugin(require('pouchdb-find'));

    'use strict';
    var service = {
      init: function(base) {
        return new PouchDB(base);
      },
      getAll: function(db) {
        db.info().then(function (result) {
          console.log(result.adapter);
        }).catch(function (err) {
          alert(err);
        });
        var deferred = $q.defer();
        db.allDocs({include_docs: true}).then(function (result) {
          return $q.all(result.rows.map(function (row) {
            return row.doc;
          }));
        }).then(function(res) {
          deferred.resolve(res);
        }).catch(function (err) {
          alert(err);
        });
        return deferred.promise;
      },
      query: function(db, map, options) {
        var deferred = $q.defer();
        db.query(map, options).then(function (result) {
          deferred.resolve({ result: result, options: options });
        });
        return deferred.promise;
      },
      addIndex: function(db, index) {
        var deferred = $q.defer();
        db.createIndex(index).then(function () {
          deferred.resolve();
        }).catch(function () {
          deferred.resolve();
        });
        return deferred.promise;
      },
      find: function(db, index, map) {
        var deferred = $q.defer();
        this.addIndex(db, index).then(function() {
          db.find(map).then(function (result) {
            deferred.resolve({ result: result, map: map });
          }).catch(function (err) {
            console.log(err)
          });
        });
        return deferred.promise;
      },
      get: function(db, id) {
        var deferred = $q.defer();
        db.get(id).then(function (res) {
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      getBy: function(db, json) {
        var deferred = $q.defer();
        db.allDocs({include_docs: true}).then(function (result) {
          var res = [];
          for (var i in result.rows) {
            var include = false;
            for (var key in json) {
              if (result.rows[i].doc[key] == json[key]) {
                include = true;
              }
            }
            if (include) {
              res.push(result.rows[i].doc);
            }
          }
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      insert: function(db, json) {
        var deferred = $q.defer();
        db.post(json).then(function(res) {
          json._id = res.id;
          deferred.resolve(json);
        });
        return deferred.promise;
      },
      remove: function(db, id) {
        var deferred = $q.defer();
        db.get(id).then(function (doc) {
          return db.remove(doc);
        }).then(function(res) {
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      update: function(db, id, json) {
        var deferred = $q.defer();
        db.get(id).then(function (doc) {
          for (var key in json) {
            doc[key] = json[key];
          }
          db.put(doc);
          deferred.resolve();
        });
        return deferred.promise;
      }
    };
    return service;
  });

  return moduleName;
});

